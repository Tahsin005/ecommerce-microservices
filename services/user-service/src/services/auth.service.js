import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userRepository from '../repositories/user.repository.js'
import config from '../config.js'
import { AppError } from '@ecommerce/common'

const authService = {
    async register({ name, email, password }) {
        const existing = await userRepository.findByEmail(email)
        if (existing) throw new AppError('Email already in use', 409)

        const passwordHash = await bcrypt.hash(password, 12)
        const user = await userRepository.create({ name, email, passwordHash })

        const token = jwt.sign({ sub: user._id, role: user.role }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        })

        return { user: _sanitize(user), token }
    },

    async login({ email, password }) {
        const user = await userRepository.findByEmail(email, true) // include passwordHash
        if (!user) throw new AppError('Invalid credentials', 401)

        // We need a Mongoose document for comparePassword — call it directly with bcrypt
        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) throw new AppError('Invalid credentials', 401)

        const token = jwt.sign({ sub: user._id, role: user.role }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        })

        return { user: _sanitize(user), token }
    },

    verifyToken(token) {
        try {
            return jwt.verify(token, config.jwt.secret)
        } catch {
            throw new AppError('Invalid or expired token', 401)
        }
    },
}

// Strip sensitive fields before returning to handlers
function _sanitize(user) {
    const { passwordHash, __v, ...safe } = user
    return safe
}

export default authService
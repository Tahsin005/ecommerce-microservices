import userRepository from '../repositories/user.repository.js'
import { AppError } from '@ecommerce/common'

const userService = {
    async getProfile(userId) {
        const user = await userRepository.findById(userId)
        if (!user) throw new AppError('User not found', 404)
        return user
    },

    async updateProfile(userId, updates) {
        // Prevent role escalation from this endpoint
        const { role, passwordHash, ...safe } = updates
        const user = await userRepository.update(userId, safe)
        if (!user) throw new AppError('User not found', 404)
        return user
    },
}

export default userService
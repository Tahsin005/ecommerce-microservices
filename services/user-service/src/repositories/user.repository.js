import User from '../models/user.model.js'

const userRepository = {
    async findById(id) {
        return User.findById(id).lean()
    },

    async findByEmail(email, withPassword = false) {
        const query = User.findOne({ email })
        if (withPassword) query.select('+passwordHash')
        return query.lean()
    },

    async create(data) {
        const user = await User.create(data)
        return user.toObject()
    },

    async update(id, data) {
        return User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean()
    },
}

export default userRepository
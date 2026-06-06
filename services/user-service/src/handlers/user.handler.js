import userService from '../services/user.service.js'

const userHandler = {
    async getMe(req, res, next) {
        try {
            const user = await userService.getProfile(req.user.sub)
            res.status(200).json({ success: true, data: user })
        } catch (err) {
            next(err)
        }
    },

    async updateMe(req, res, next) {
        try {
            const user = await userService.updateProfile(req.user.sub, req.body)
            res.status(200).json({ success: true, data: user })
        } catch (err) {
            next(err)
        }
    },
}

export default userHandler
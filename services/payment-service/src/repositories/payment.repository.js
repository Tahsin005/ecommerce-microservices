import Payment from '../models/payment.model.js'

const paymentRepository = {
    async findByOrderId(orderId) {
        return Payment.findOne({ orderId }).lean()
    },

    async findByUserId(userId) {
        return Payment.find({ userId }).sort({ createdAt: -1 }).lean()
    },

    async create(data) {
        const payment = await Payment.create(data)
        return payment.toObject()
    },
}

export default paymentRepository
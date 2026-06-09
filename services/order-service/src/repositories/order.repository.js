import Order from '../models/order.model.js'

const orderRepository = {
    async findById(id) {
        return Order.findById(id).lean()
    },

    async findByUserId(userId) {
        return Order.find({ userId }).sort({ createdAt: -1 }).lean()
    },

    async create(data) {
        const order = await Order.create(data)
        return order.toObject()
    },

    async updateStatus(id, status) {
        return Order.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).lean()
    },
}

export default orderRepository
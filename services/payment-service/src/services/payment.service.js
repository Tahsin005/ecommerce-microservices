import paymentRepository from '../repositories/payment.repository.js'
import orderClient from '../grpc/order.client.js'
import { AppError } from '@ecommerce/common'

const paymentService = {
    async getPaymentByOrder(orderId, userId) {
        const payment = await paymentRepository.findByOrderId(orderId)
        if (!payment) throw new AppError('Payment not found', 404)
        if (payment.userId !== userId) throw new AppError('Forbidden', 403)
        return payment
    },

    async processPayment(userId, { orderId }) {
        // verify order exists and belongs to user
        const order = await orderClient.getOrder(orderId)
        if (order.userId !== userId) throw new AppError('Forbidden', 403)

        // verify order is in pending state
        if (order.status !== 'pending') {
            throw new AppError(`Order is already ${order.status}`, 400)
        }

        // check payment doesn't already exist for this order
        const existing = await paymentRepository.findByOrderId(orderId)
        if (existing) throw new AppError('Payment already processed for this order', 409)

        // mock payment (always succeeds)
        const payment = await paymentRepository.create({
            orderId,
            userId,
            amount: order.totalPrice,
            status: 'success',
            method: 'mock',
        })

        // update order status to confirmed
        await orderClient.updateOrderStatus(orderId, 'confirmed')

        return payment
    },
}

export default paymentService
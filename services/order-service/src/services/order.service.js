import orderRepository from '../repositories/order.repository.js'
import cartClient from '../grpc/cart.client.js'
import productClient from '../grpc/product.client.js'
import { AppError } from '@ecommerce/common'

const orderService = {
    async getOrders(userId) {
        return orderRepository.findByUserId(userId)
    },

    async getById(orderId, userId) {
        const order = await orderRepository.findById(orderId)
        if (!order) throw new AppError('Order not found', 404)

        // users can only see their own orders
        if (order.userId !== userId) throw new AppError('Forbidden', 403)

        return order
    },

    async placeOrder(userId, { shippingAddress }) {
        // fetch cart via gRPC
        const cart = await cartClient.getCart(userId)
        if (!cart.items || cart.items.length === 0) {
            throw new AppError('Cart is empty', 400)
        }

        // reserve stock for each item via gRPC
        const reservations = []
        try {
            for (const item of cart.items) {
                const result = await productClient.reserveStock(item.productId, item.quantity)
                if (!result.success) {
                    throw new AppError(`Failed to reserve stock for ${item.name}`, 400)
                }
                reservations.push(item)
            }
        } catch (err) {
            // rollback successful reservations
            for (const reserved of reservations) {
                try {
                    await productClient.releaseStock(reserved.productId, reserved.quantity)
                } catch (rollbackErr) {
                    console.error(`Failed to rollback stock for ${reserved.productId}`, rollbackErr)
                }
            }
            throw err
        }

        // create order
        const order = await orderRepository.create({
            userId,
            items:      cart.items,
            totalPrice: cart.totalPrice,
            status:     'pending',
            shippingAddress,
        })

        // clear cart via gRPC
        await cartClient.clearCart(userId)

        return order
    },

    async cancelOrder(orderId, userId) {
        const order = await orderRepository.findById(orderId)
        if (!order) throw new AppError('Order not found', 404)
        if (order.userId !== userId) throw new AppError('Forbidden', 403)

        if (!['pending', 'confirmed'].includes(order.status)) {
            throw new AppError(`Cannot cancel an order with status: ${order.status}`, 400)
        }

        // release stock
        for (const item of order.items) {
            try {
                await productClient.releaseStock(item.productId, item.quantity)
            } catch (err) {
                console.error(`Failed to release stock for ${item.productId} on order cancel`, err)
            }
        }

        return orderRepository.updateStatus(orderId, 'cancelled')
    },
}

export default orderService
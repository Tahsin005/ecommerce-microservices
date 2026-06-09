import orderService from '../services/order.service.js'

const orderHandler = {
    async getOrders(req, res, next) {
        try {
            const orders = await orderService.getOrders(req.user.sub)
            res.status(200).json({ success: true, data: orders })
        } catch (err) {
            next(err)
        }
    },

    async getById(req, res, next) {
        try {
            const order = await orderService.getById(req.params.id, req.user.sub)
            res.status(200).json({ success: true, data: order })
        } catch (err) {
            next(err)
        }
    },

    async placeOrder(req, res, next) {
        try {
            const order = await orderService.placeOrder(req.user.sub, req.body)
            res.status(201).json({ success: true, data: order })
        } catch (err) {
            next(err)
        }
    },

    async cancelOrder(req, res, next) {
        try {
            const order = await orderService.cancelOrder(req.params.id, req.user.sub)
            res.status(200).json({ success: true, data: order })
        } catch (err) {
            next(err)
        }
    },
}

export default orderHandler
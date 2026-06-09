import paymentService from '../services/payment.service.js'

const paymentHandler = {
    async processPayment(req, res, next) {
        try {
            const payment = await paymentService.processPayment(req.user.sub, req.body)
            res.status(201).json({ success: true, data: payment })
        } catch (err) {
            next(err)
        }
    },

    async getPaymentByOrder(req, res, next) {
        try {
            const payment = await paymentService.getPaymentByOrder(
                req.params.orderId,
                req.user.sub
            )
            res.status(200).json({ success: true, data: payment })
        } catch (err) {
            next(err)
        }
    },
}

export default paymentHandler
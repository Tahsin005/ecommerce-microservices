import { Router } from 'express'
import paymentHandler from '../handlers/payment.handler.js'
import authenticate from '../middlewares/auth.middleware.js'

const router = Router()

router.use(authenticate)

router.post('/',                      paymentHandler.processPayment)
router.get('/order/:orderId',         paymentHandler.getPaymentByOrder)

export default router
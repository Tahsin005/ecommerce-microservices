import { Router } from 'express'
import orderHandler from '../handlers/order.handler.js'
import authenticate from '../middlewares/auth.middleware.js'

const router = Router()

router.use(authenticate)

router.get('/',        orderHandler.getOrders)
router.get('/:id',     orderHandler.getById)
router.post('/',       orderHandler.placeOrder)
router.patch('/:id/cancel', orderHandler.cancelOrder)

export default router
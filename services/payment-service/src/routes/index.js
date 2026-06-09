import { Router } from 'express'
import paymentRoutes from './payment.routes.js'

const router = Router()

router.get('/health', (req, res) => {
    res.status(200).json({
        status:    'ok',
        service:   'payment-service',
        timestamp: new Date().toISOString(),
    })
})

router.use('/api/payments', paymentRoutes)

export default router
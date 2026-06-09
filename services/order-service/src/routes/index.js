import { Router } from 'express'
import orderRoutes from './order.routes.js'

const router = Router()

router.get('/health', (req, res) => {
    res.status(200).json({
        status:    'ok',
        service:   'order-service',
        timestamp: new Date().toISOString(),
    })
})

router.use('/api/orders', orderRoutes)

export default router
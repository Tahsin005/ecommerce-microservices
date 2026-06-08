import { Router } from 'express'
import cartRoutes from './cart.routes.js'

const router = Router()

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'cart-service',
    timestamp: new Date().toISOString(),
  })
})

router.use('/api/cart', cartRoutes)

export default router
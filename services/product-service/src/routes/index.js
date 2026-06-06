import { Router } from 'express'
import productRoutes from './product.routes.js'
import categoryRoutes from './category.routes.js'

const router = Router()

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'product-service',
    timestamp: new Date().toISOString(),
  })
})

router.use('/api/products', productRoutes)
router.use('/api/categories', categoryRoutes)

export default router
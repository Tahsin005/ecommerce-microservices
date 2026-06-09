import { Router } from 'express'
import productHandler from '../handlers/product.handler.js'
import authenticate from '../middlewares/auth.middleware.js'
import { cacheMiddleware } from '@ecommerce/common'

const router = Router()

router.get('/', cacheMiddleware(60), productHandler.getAll)
router.get('/slug/:slug', cacheMiddleware(60), productHandler.getBySlug)
router.get('/:id', cacheMiddleware(60), productHandler.getById)
    
router.post('/', authenticate, productHandler.create)
router.put('/:id', authenticate, productHandler.update)
router.delete('/:id', authenticate, productHandler.delete)

export default router
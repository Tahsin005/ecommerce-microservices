import { Router } from 'express'
import productHandler from '../handlers/product.handler.js'
import authenticate from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', productHandler.getAll)
router.get('/slug/:slug', productHandler.getBySlug)
router.get('/:id', productHandler.getById)
    
router.post('/', authenticate, productHandler.create)
router.put('/:id', authenticate, productHandler.update)
router.delete('/:id', authenticate, productHandler.delete)

export default router
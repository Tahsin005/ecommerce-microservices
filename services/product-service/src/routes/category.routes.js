import { Router } from 'express'
import categoryHandler from '../handlers/category.handler.js'
import authenticate from '../middlewares/auth.middleware.js'
import { cacheMiddleware } from '@ecommerce/common'

const router = Router()

router.get('/', cacheMiddleware(60), categoryHandler.getAll)
router.get('/:id', cacheMiddleware(60), categoryHandler.getById)
    
router.post('/', authenticate, categoryHandler.create)       
router.put('/:id', authenticate, categoryHandler.update)     
router.delete('/:id', authenticate, categoryHandler.delete)  

export default router
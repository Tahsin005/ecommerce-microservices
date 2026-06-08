import { Router } from 'express'
import categoryHandler from '../handlers/category.handler.js'
import authenticate from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', categoryHandler.getAll)
router.get('/:id', categoryHandler.getById)
    
router.post('/', authenticate, categoryHandler.create)       
router.put('/:id', authenticate, categoryHandler.update)     
router.delete('/:id', authenticate, categoryHandler.delete)  

export default router
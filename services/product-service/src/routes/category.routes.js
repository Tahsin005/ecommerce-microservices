import { Router } from 'express'
import categoryHandler from '../handlers/category.handler.js'

const router = Router()

router.get('/', categoryHandler.getAll)
router.get('/:id', categoryHandler.getById)
router.post('/', categoryHandler.create)       
router.put('/:id', categoryHandler.update)     
router.delete('/:id', categoryHandler.delete)  

export default router
import { Router } from 'express'
import productHandler from '../handlers/product.handler.js'

const router = Router()

router.get('/', productHandler.getAll)
router.get('/slug/:slug', productHandler.getBySlug)
router.get('/:id', productHandler.getById)
router.post('/', productHandler.create)
router.put('/:id', productHandler.update)
router.delete('/:id', productHandler.delete)

export default router
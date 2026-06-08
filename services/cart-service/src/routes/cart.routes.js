import { Router } from 'express'
import cartHandler from '../handlers/cart.handler.js'
import authenticate from '../middlewares/auth.middleware.js'

const router = Router()

router.use(authenticate) 

router.get('/', cartHandler.getCart)
router.post('/items', cartHandler.addItem)
router.put('/items/:productId', cartHandler.updateItem)
router.delete('/items/:productId', cartHandler.removeItem)
router.delete('/', cartHandler.clearCart)

export default router
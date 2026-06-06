import { Router } from 'express'
import userHandler from '../handlers/user.handler.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(authenticate)   // all /users routes require auth

router.get('/me', userHandler.getMe)
router.patch('/me', userHandler.updateMe)

export default router
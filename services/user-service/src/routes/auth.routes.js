import { Router } from 'express'
import authHandler from '../handlers/auth.handler.js'

const router = Router()

router.post('/register', authHandler.register)
router.post('/login', authHandler.login)

export default router
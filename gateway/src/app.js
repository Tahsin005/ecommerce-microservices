import express from 'express'
import logger from './middlewares/logger.middleware.js'
import { globalLimiter, authLimiter } from './middlewares/rateLimit.middleware.js'
import errorMiddleware from './middlewares/error.middleware.js'
import userProxy from './proxy/user.proxy.js'
import productProxy from './proxy/product.proxy.js'
import authenticate from './middlewares/auth.middleware.js'
import authenticateWrites from './middlewares/conditionalAuth.middleware.js'

const app = express()

app.use(logger)
app.use(globalLimiter)

// health check — gateway itself, no proxy
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'gateway',
    timestamp: new Date().toISOString(),
  })
})

// auth routes — stricter rate limit, proxy to user-service
app.use('/api/auth', authLimiter, userProxy)

// user routes — verify JWT, then proxy to user-service
app.use('/api/users', authenticate, userProxy)

// product routes — proxy to product-service
app.use('/api/products', authenticateWrites, productProxy)

// category routes — proxy to product-service
app.use('/api/categories', authenticateWrites, productProxy)

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

app.use(errorMiddleware)

export default app

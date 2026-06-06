import express from 'express'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({
      status: 'ok',
      service: 'user-service',
      timestamp: new Date().toISOString(),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

app.use(errorMiddleware)

export default app
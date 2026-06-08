import express from 'express'
import routes from './routes/index.js'
import errorMiddleware from './middlewares/error.middleware.js'

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'cart-service',
    timestamp: new Date().toISOString(),
  })
})

app.use(routes)

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

app.use(errorMiddleware)

export default app
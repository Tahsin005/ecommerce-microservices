import mongoose from 'mongoose'
import app from './app.js'
import config from './config.js'

async function start() {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('[cart-service] MongoDB connected')

    app.listen(config.port, () => {
      console.log(`[cart-service] HTTP listening on port ${config.port}`)
    })
  } catch (err) {
    console.error('[cart-service] Failed to start:', err)
    process.exit(1)
  }
}

start()
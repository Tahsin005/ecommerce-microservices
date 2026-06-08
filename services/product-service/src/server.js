import mongoose from 'mongoose'
import app from './app.js'
import config from './config.js'
import { startGrpcServer } from './grpc/product.grpc.js'

async function start() {
    try {
        await mongoose.connect(config.mongoUri)
        console.log('[product-service] MongoDB connected')

        app.listen(config.port, () => {
            console.log(`[product-service] HTTP listening on port ${config.port}`)
        })

        startGrpcServer(config.grpcPort)
    } catch (err) {
        console.error('[product-service] Failed to start:', err)
        process.exit(1)
    }
}

start()
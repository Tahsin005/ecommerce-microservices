import mongoose from 'mongoose'
import app from './app.js'
import config from './config.js'
import { startGrpcServer } from './grpc/order.grpc.js'

async function start() {
    try {
        await mongoose.connect(config.mongoUri)
        console.log('[order-service] MongoDB connected')

        app.listen(config.port, () => {
            console.log(`[order-service] HTTP listening on port ${config.port}`)
        })

        startGrpcServer(config.grpcPort)
    } catch (err) {
        console.error('[order-service] Failed to start:', err)
        process.exit(1)
    }
}

start()
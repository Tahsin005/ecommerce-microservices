import 'dotenv/config'

const config = {
    env:                 process.env.NODE_ENV || 'development',
    port:                parseInt(process.env.PORT, 10) || 3005,
    mongoUri:            process.env.MONGO_URI || 'mongodb://localhost:27017/payments',
    orderServiceGrpcUrl: process.env.ORDER_SERVICE_GRPC_URL || 'order-service:50054',
}

export default config
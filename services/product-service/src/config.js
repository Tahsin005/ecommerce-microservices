import 'dotenv/config'

const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3002,
    grpcPort: parseInt(process.env.GRPC_PORT, 10) || 50052,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/products',
}

export default config
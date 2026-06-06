const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3001,
    grpcPort: parseInt(process.env.GRPC_PORT, 10) || 50051,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/users',
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
}

if (!config.jwt.secret) {
    throw new Error('JWT_SECRET env variable is required')
}

export default config
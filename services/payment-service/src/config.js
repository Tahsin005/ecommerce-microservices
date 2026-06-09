import 'dotenv/config'

const config = {
    env:                 process.env.NODE_ENV || 'development',
    port:                parseInt(process.env.PORT, 10) || 3005,
    mongoUri:            process.env.MONGO_URI || 'mongodb://localhost:27017/payments',
    orderServiceGrpcUrl: process.env.ORDER_SERVICE_GRPC_URL || 'order-service:50054',
    userServiceGrpcUrl:  process.env.USER_SERVICE_GRPC_URL  || 'user-service:50051',
    rabbitmqUrl:         process.env.RABBITMQ_URL            || 'amqp://rabbitmq:5672',
}

export default config
import 'dotenv/config'

const config = {
  env:                   process.env.NODE_ENV || 'development',
  port:                  parseInt(process.env.PORT, 10) || 3004,
  mongoUri:              process.env.MONGO_URI || 'mongodb://localhost:27017/orders',
  cartServiceGrpcUrl:    process.env.CART_SERVICE_GRPC_URL    || 'cart-service:50053',
  productServiceGrpcUrl: process.env.PRODUCT_SERVICE_GRPC_URL || 'product-service:50052',
}

export default config
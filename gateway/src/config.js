import 'dotenv/config'

const config = {
  port: parseInt(process.env.PORT, 10) || 80,
  jwtSecret: process.env.JWT_SECRET,
  services: {
    user: process.env.USER_SERVICE_URL || 'http://user-service:3001',
    product: process.env.PRODUCT_SERVICE_URL || 'http://product-service:3002',
  },
}

if (!config.jwtSecret) {
  throw new Error('JWT_SECRET env variable is required')
}

export default config

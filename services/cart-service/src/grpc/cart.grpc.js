import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { fileURLToPath } from 'url'
import path from 'path'
import cartService from '../services/cart.service.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROTO_PATH = path.resolve(__dirname, '../../../../packages/proto/cart.proto')

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const { cart: cartProto } = grpc.loadPackageDefinition(packageDef)

const getCart = async (call, callback) => {
  try {
    const cart = await cartService.getCart(call.request.userId)
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    )

    callback(null, {
      userId:     cart.userId,
      items:      cart.items,
      totalPrice: totalPrice,
    })
  } catch (err) {
    callback({
      code:    grpc.status.NOT_FOUND,
      message: err.message,
    })
  }
}

const clearCart = async (call, callback) => {
  try {
    await cartService.clearCart(call.request.userId)
    callback(null, { success: true })
  } catch (err) {
    callback({
      code:    grpc.status.INTERNAL,
      message: err.message,
    })
  }
}

export const startGrpcServer = (port) => {
  const server = new grpc.Server()

  server.addService(cartProto.CartService.service, {
    getCart,
    clearCart,
  })

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, boundPort) => {
      if (err) {
        console.error('[cart-service] gRPC failed to start:', err)
        process.exit(1)
      }
      console.log(`[cart-service] gRPC listening on port ${boundPort}`)
    }
  )
}
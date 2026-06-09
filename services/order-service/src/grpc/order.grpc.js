import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { fileURLToPath } from 'url'
import path from 'path'
import orderRepository from '../repositories/order.repository.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROTO_PATH = path.resolve(__dirname, '../../../../packages/proto/order.proto')

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const { order: orderProto } = grpc.loadPackageDefinition(packageDef)

const getOrder = async (call, callback) => {
  try {
    const order = await orderRepository.findById(call.request.orderId)
    if (!order) {
      return callback({
        code:    grpc.status.NOT_FOUND,
        message: 'Order not found',
      })
    }

    callback(null, {
      id:         order._id.toString(),
      userId:     order.userId,
      items:      order.items,
      totalPrice: order.totalPrice,
      status:     order.status,
    })
  } catch (err) {
    callback({
      code:    grpc.status.INTERNAL,
      message: err.message,
    })
  }
}

const updateOrderStatus = async (call, callback) => {
  try {
    const { orderId, status } = call.request
    const order = await orderRepository.updateStatus(orderId, status)
    if (!order) {
      return callback({
        code:    grpc.status.NOT_FOUND,
        message: 'Order not found',
      })
    }

    callback(null, {
      success: true,
      status:  order.status,
    })
  } catch (err) {
    callback({
      code:    grpc.status.INTERNAL,
      message: err.message,
    })
  }
}

export const startGrpcServer = (port) => {
  const server = new grpc.Server()

  server.addService(orderProto.OrderService.service, {
    getOrder,
    updateOrderStatus,
  })

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, boundPort) => {
      if (err) {
        console.error('[order-service] gRPC failed to start:', err)
        process.exit(1)
      }
      console.log(`[order-service] gRPC listening on port ${boundPort}`)
    }
  )
}
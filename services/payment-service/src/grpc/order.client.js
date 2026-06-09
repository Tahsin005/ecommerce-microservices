import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { fileURLToPath } from 'url'
import path from 'path'
import config from '../config.js'

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

const orderClient = new orderProto.OrderService(
    config.orderServiceGrpcUrl,
    grpc.credentials.createInsecure()
)

const getOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        orderClient.getOrder({ orderId }, (err, response) => {
            if (err) reject(err)
            else resolve(response)
        })
    })
}

const updateOrderStatus = (orderId, status) => {
    return new Promise((resolve, reject) => {
        orderClient.updateOrderStatus({ orderId, status }, (err, response) => {
            if (err) reject(err)
            else resolve(response)
        })
    })
}

export default { getOrder, updateOrderStatus }
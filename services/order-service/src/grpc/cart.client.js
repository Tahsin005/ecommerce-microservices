import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { fileURLToPath } from 'url'
import path from 'path'
import config from '../config.js'

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

const cartClient = new cartProto.CartService(
    config.cartServiceGrpcUrl,
    grpc.credentials.createInsecure()
)

const getCart = (userId) => {
    return new Promise((resolve, reject) => {
        cartClient.getCart({ userId }, (err, response) => {
            if (err) reject(err)
            else resolve(response)
        })
    })
}

const clearCart = (userId) => {
    return new Promise((resolve, reject) => {
        cartClient.clearCart({ userId }, (err, response) => {
            if (err) reject(err)
            else resolve(response)
        })
    })
}

export default { getCart, clearCart }
import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { fileURLToPath } from 'url'
import path from 'path'
import config from '../config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROTO_PATH = path.resolve(__dirname, '../../../../packages/proto/product.proto')

const packageDef = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})

const { product: productProto } = grpc.loadPackageDefinition(packageDef)

const productClient = new productProto.ProductService(
    config.productServiceGrpcUrl,
    grpc.credentials.createInsecure()
)

const reserveStock = (productId, quantity) => {
    return new Promise((resolve, reject) => {
        productClient.reserveStock({ productId, quantity }, (err, response) => {
            if (err) reject(err)
            else resolve(response)
        })
    })
}

export default { reserveStock }
import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { fileURLToPath } from 'url'
import path from 'path'
import productService from '../services/product.service.js'

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

const getProduct = async (call, callback) => {
  try {
    const product = await productService.getById(call.request.productId)
    callback(null, {
      id:          product._id.toString(),
      name:        product.name,
      description: product.description || '',
      price:       product.price,
      inventory:   product.inventory,
      categoryId:  product.category._id.toString(),
      isActive:    product.isActive,
    })
  } catch (err) {
    callback({
      code: grpc.status.NOT_FOUND,
      message: err.message,
    })
  }
}

const checkStock = async (call, callback) => {
  try {
    const { productId, quantity } = call.request
    const product = await productService.getById(productId)
    callback(null, {
      available: product.inventory >= quantity,
      inventory: product.inventory,
    })
  } catch (err) {
    callback({
      code: grpc.status.NOT_FOUND,
      message: err.message,
    })
  }
}

export const startGrpcServer = (port) => {
  const server = new grpc.Server()

  server.addService(productProto.ProductService.service, {
    getProduct,
    checkStock,
  })

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, boundPort) => {
      if (err) {
        console.error('[product-service] gRPC failed to start:', err)
        process.exit(1)
      }
      console.log(`[product-service] gRPC listening on port ${boundPort}`)
    }
  )
}
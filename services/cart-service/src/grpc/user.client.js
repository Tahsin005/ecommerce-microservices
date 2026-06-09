import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROTO_PATH = path.resolve(__dirname, '../../../../packages/proto/user.proto')

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const { user: userProto } = grpc.loadPackageDefinition(packageDef)

const userClient = new userProto.UserService(
  process.env.USER_SERVICE_GRPC_URL || 'user-service:50051',
  grpc.credentials.createInsecure()
)

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    userClient.verifyToken({ token }, (err, response) => {
      if (err) reject(err)
      else resolve(response)
    })
  })
}

const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    userClient.getUser({ userId }, (err, response) => {
      if (err) reject(err)
      else resolve(response)
    })
  })
}

export default { verifyToken, getUser }
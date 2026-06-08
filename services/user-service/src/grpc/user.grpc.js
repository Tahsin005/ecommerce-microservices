import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { fileURLToPath } from 'url'
import path from 'path'
import authService from '../services/auth.service.js'
import userService from '../services/user.service.js'

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

const verifyToken = (call, callback) => {
  try {
    const decoded = authService.verifyToken(call.request.token)
    callback(null, { userId: decoded.sub, role: decoded.role })
  } catch (err) {
    callback({
      code: grpc.status.UNAUTHENTICATED,
      message: err.message,
    })
  }
}

const getUser = async (call, callback) => {
  try {
    const user = await userService.getProfile(call.request.userId)
    callback(null, {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
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

  server.addService(userProto.UserService.service, {
    verifyToken,
    getUser,
  })

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, boundPort) => {
      if (err) {
        console.error('[user-service] gRPC failed to start:', err)
        process.exit(1)
      }
      console.log(`[user-service] gRPC listening on port ${boundPort}`)
    }
  )
}
import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { fileURLToPath } from 'url'
import path from 'path'
import config from '../config.js'

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
    config.userServiceGrpcUrl,
    grpc.credentials.createInsecure()
)

const getUser = (userId) => {
    return new Promise((resolve, reject) => {
        userClient.getUser({ userId }, (err, response) => {
            if (err) reject(err)
            else resolve(response)
        })
    })
}

export default { getUser }
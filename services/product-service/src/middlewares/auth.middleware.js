import userClient from '../grpc/user.client.js'

const authenticate = async (req, res, next) => {
  const userId = req.headers['x-user-id']
  const userRole = req.headers['x-user-role']

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  try {
    // confirm user actually exists in DB via gRPC
    const user = await userClient.getUser(userId)

    req.user = { sub: user.id, role: user.role }
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'User not found or inactive' })
  }
}

export default authenticate
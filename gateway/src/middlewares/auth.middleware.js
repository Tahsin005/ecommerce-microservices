import jwt from 'jsonwebtoken'
import config from '../config.js'

const authenticate = (req, res, next) => {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' })
  }

  const token = header.split(' ')[1]

  try {
    const decoded = jwt.verify(token, config.jwtSecret)

    // Forward user info to downstream services via headers
    req.headers['x-user-id'] = decoded.sub
    req.headers['x-user-role'] = decoded.role

    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

export default authenticate

import authenticate from './auth.middleware.js'

const WRITE_METHODS = new Set(['POST', 'PUT', 'DELETE', 'PATCH'])

const authenticateWrites = (req, res, next) => {
  if (WRITE_METHODS.has(req.method)) {
    return authenticate(req, res, next)
  }
  next()
}

export default authenticateWrites
import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config.js'

const userProxy = createProxyMiddleware({
  target: config.services.user,
  changeOrigin: true,
  pathRewrite: (path, req) => req.originalUrl,  // preserve the full original path
  on: {
    error: (err, req, res) => {
      console.error('[gateway] user-service proxy error:', err.message)
      res.status(502).json({ success: false, message: 'User service unavailable' })
    },
  },
})

export default userProxy

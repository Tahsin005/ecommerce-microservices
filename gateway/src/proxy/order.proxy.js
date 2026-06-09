import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config.js'

const orderProxy = createProxyMiddleware({
  target: config.services.order,
  changeOrigin: true,
  pathRewrite: (path, req) => req.originalUrl,  // preserve the full original path
  on: {
    error: (err, req, res) => {
      console.error('[gateway] order-service proxy error:', err.message)
      res.status(502).json({ success: false, message: 'Order service unavailable' })
    },
  },
})

export default orderProxy
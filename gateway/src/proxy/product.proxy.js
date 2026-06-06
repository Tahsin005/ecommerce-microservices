import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config.js'

const productProxy = createProxyMiddleware({
  target: config.services.product,
  changeOrigin: true,
  pathRewrite: (path, req) => req.originalUrl,  // preserve the full original path
  on: {
    error: (err, req, res) => {
      console.error('[gateway] product-service proxy error:', err.message)
      res.status(502).json({ success: false, message: 'Product service unavailable' })
    },
  },
})

export default productProxy
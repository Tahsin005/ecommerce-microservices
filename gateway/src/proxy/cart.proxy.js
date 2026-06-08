import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config.js'

const cartProxy = createProxyMiddleware({
  target: config.services.cart,
  changeOrigin: true,
  pathRewrite: (path, req) => req.originalUrl, 
  on: {
    error: (err, req, res) => {
      console.error('[gateway] cart-service proxy error:', err.message)
      res.status(502).json({ success: false, message: 'Cart service unavailable' })
    },
  },
})

export default cartProxy
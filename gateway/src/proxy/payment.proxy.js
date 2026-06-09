import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '../config.js'

const paymentProxy = createProxyMiddleware({
  target: config.services.payment,
  changeOrigin: true,
  pathRewrite: (path, req) => req.originalUrl,  // preserve the full original path
  on: {
    error: (err, req, res) => {
      console.error('[gateway] payment-service proxy error:', err.message)
      res.status(502).json({ success: false, message: 'Payment service unavailable' })
    },
  },
})

export default paymentProxy
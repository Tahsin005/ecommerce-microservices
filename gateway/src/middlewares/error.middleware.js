const errorMiddleware = (err, req, res, next) => {
  console.error('[gateway] unhandled error:', err)
  res.status(500).json({ success: false, message: 'Gateway error' })
}

export default errorMiddleware

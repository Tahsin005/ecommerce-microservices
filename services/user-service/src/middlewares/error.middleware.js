import { AppError } from '@ecommerce/common'

function errorMiddleware(err, req, res, next) {
    const statusCode = err instanceof AppError ? err.statusCode : 500
    const message = err instanceof AppError ? err.message : 'Internal server error'

    if (statusCode === 500) {
        console.error('[ERROR]', err)
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    })
}

export { errorMiddleware }
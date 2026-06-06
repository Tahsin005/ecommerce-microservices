class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = 'AppError'
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 422)
    this.name = 'ValidationError'
  }
}

export { AppError, NotFoundError, ValidationError }
import morgan from 'morgan'

const format = ':method :url :status :res[content-length] - :response-time ms'

const logger = morgan(format)

export default logger

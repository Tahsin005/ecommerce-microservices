import { rabbitmq } from '@ecommerce/common'
import { startOrderWorker } from './workers/order.worker.js'
import config from './config.js'

async function start() {
    try {
        await rabbitmq.connect()
        console.log('[notification-service] RabbitMQ connected')

        await startOrderWorker()

        console.log('[notification-service] workers started')
    } catch (err) {
        console.error('[notification-service] Failed to start:', err)
        process.exit(1)
    }
}

start()
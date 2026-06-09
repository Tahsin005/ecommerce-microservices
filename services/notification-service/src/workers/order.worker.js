import { rabbitmq } from '@ecommerce/common'
import NotificationFactory from '../factory/notification.factory.js'

const EXCHANGE = 'notifications'
const QUEUE    = 'notification.order.confirmed'
const ROUTING  = 'order.confirmed'

export const startOrderWorker = async () => {
    const channel = rabbitmq.getChannel()

    // ensure exchange exists
    await channel.assertExchange(EXCHANGE, 'topic', { durable: true })

    // ensure queue exists and is durable
    await channel.assertQueue(QUEUE, { durable: true })

    // bind queue to exchange with routing key
    await channel.bindQueue(QUEUE, EXCHANGE, ROUTING)

    // process one message at a time
    channel.prefetch(1)

    await rabbitmq.consume(QUEUE, async (message) => {
        const { type, payload } = message
        console.log(`[order-worker] received event: ${type}`)

        const notification = NotificationFactory.create('email', payload)
        await notification.send()
    })

    console.log('[order-worker] listening for order.confirmed events')
}
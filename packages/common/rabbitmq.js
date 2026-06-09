import amqplib from 'amqplib'

let connection = null
let channel    = null

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'

const connect = async () => {
    connection = await amqplib.connect(RABBITMQ_URL)
    channel    = await connection.createChannel()

    connection.on('error', (err) => {
        console.error('[rabbitmq] connection error:', err.message)
    })

    connection.on('close', () => {
        console.error('[rabbitmq] connection closed — retrying in 5s')
        setTimeout(connect, 5000)
    })

    console.log('[rabbitmq] connected')
    return channel
}

const getChannel = () => {
    if (!channel) throw new Error('RabbitMQ channel not initialized — call connect() first')
    return channel
}

const publish = (exchange, routingKey, payload) => {
    const ch = getChannel()
    ch.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }   // messages survive RabbitMQ restart
    )
}

const consume = async (queue, handler) => {
    const ch = getChannel()
    await ch.consume(queue, async (msg) => {
        if (!msg) return
        try {
            const payload = JSON.parse(msg.content.toString())
            await handler(payload)
            ch.ack(msg)                // acknowledge — remove from queue
        } catch (err) {
            console.error('[rabbitmq] message processing failed:', err.message)
            ch.nack(msg, false, true)  // nack — requeue the message
        }
    })
}

export default { connect, getChannel, publish, consume }
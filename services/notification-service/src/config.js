import 'dotenv/config'

const config = {
    env:         process.env.NODE_ENV    || 'development',
    rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672',
    smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT, 10) || 587,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        from: process.env.EMAIL_FROM,
    },
}

if (!config.smtp.user || !config.smtp.pass) {
    throw new Error('SMTP_USER and SMTP_PASS are required')
}

export default config
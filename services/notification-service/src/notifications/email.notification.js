import nodemailer from 'nodemailer'
import BaseNotification from './base.notification.js'
import config from '../config.js'
import { orderConfirmedTemplate } from '../templates/order-confirmed.js'

class EmailNotification extends BaseNotification {
    constructor(payload) {
        super(payload)
        this.transporter = nodemailer.createTransport({
            host:   config.smtp.host,
            port:   config.smtp.port,
            secure: false,
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass,
            },
        })
    }

    async send() {
        const { userEmail, userName, orderId, totalPrice, items } = this.payload

        const html = orderConfirmedTemplate({ userName, orderId, totalPrice, items })

        await this.transporter.sendMail({
            from:    `"E-Commerce" <${config.smtp.from}>`,
            to:      userEmail,
            subject: `Order Confirmed — #${orderId}`,
            html,
        })

        console.log(`[notification-service] email sent to ${userEmail} for order ${orderId}`)
    }
}

export default EmailNotification
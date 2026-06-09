import EmailNotification from '../notifications/email.notification.js'

const NOTIFICATION_TYPES = {
    email: EmailNotification,
}

class NotificationFactory {
    static create(type, payload) {
        const NotificationClass = NOTIFICATION_TYPES[type]

        if (!NotificationClass) {
            throw new Error(`Unknown notification type: ${type}`)
        }

        return new NotificationClass(payload)
    }
}

export default NotificationFactory
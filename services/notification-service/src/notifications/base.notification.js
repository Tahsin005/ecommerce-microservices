class BaseNotification {
    constructor(payload) {
        this.payload = payload
    }

    async send() {
        throw new Error('send() must be implemented by subclass')
    }
}

export default BaseNotification
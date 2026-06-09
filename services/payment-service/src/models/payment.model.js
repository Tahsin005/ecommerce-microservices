import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type:     String,
            required: true,
            unique:   true,   // one payment per order
        },
        userId: {
            type:     String,
            required: true,
        },
        amount: {
            type:     Number,
            required: true,
        },
        status: {
            type:    String,
            enum:    ['success', 'failed', 'refunded'],
            default: 'success',
        },
        method: {
            type:    String,
            default: 'mock',
        },
    },
    { timestamps: true }
)

export default mongoose.model('Payment', paymentSchema)
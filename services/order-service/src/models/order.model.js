import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true },
        name:      { type: String, required: true },
        price:     { type: Number, required: true },
        quantity:  { type: Number, required: true },
    },
    { _id: false }
)

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type:     String,
            required: true,
        },
        items: [orderItemSchema],
        totalPrice: {
            type:     Number,
            required: true,
        },
        status: {
            type:    String,
            enum:    ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        shippingAddress: {
            street:  { type: String, required: true },
            city:    { type: String, required: true },
            country: { type: String, required: true },
            zip:     { type: String, required: true },
        },
    },
    { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
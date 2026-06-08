import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false }
)

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,       // one cart per user
        },
        items: [cartItemSchema],
        totalPrice: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

cartSchema.pre('save', function (next) {
    this.totalPrice = this.items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    )
})

export default mongoose.model('Cart', cartSchema)
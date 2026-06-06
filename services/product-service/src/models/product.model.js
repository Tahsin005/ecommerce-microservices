import mongoose from 'mongoose'
import slugify from 'slugify'

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        inventory: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        images: [
            {
                url: { type: String, required: true },
                alt: { type: String, default: '' },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

productSchema.pre('save', function () {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true })
    }
})

// Only return active products by default
productSchema.pre(/^find/, function () {
    if (!this.getOptions().includeInactive) {
        this.where({ isActive: true })
    }
})

export default mongoose.model('Product', productSchema)
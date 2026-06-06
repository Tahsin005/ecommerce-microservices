import Product from '../models/product.model.js'

const productRepository = {
    async findAll({ page = 1, limit = 20, category, search } = {}) {
        const query = {}

        if (category) query.category = category
        if (search) query.$text = { $search: search }

        const skip = (page - 1) * limit

        const [products, total] = await Promise.all([
            Product.find(query).populate('category', 'name slug').skip(skip).limit(limit).lean(),
            Product.countDocuments(query),
        ])

        return { products, total, page, limit }
    },

    async findById(id) {
        return Product.findById(id).populate('category', 'name slug').lean()
    },

    async findBySlug(slug) {
        return Product.findOne({ slug }).populate('category', 'name slug').lean()
    },

    async create(data) {
        const product = await Product.create(data)
        return product.toObject()
    },

    async update(id, data) {
        return Product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).lean()
    },

    async updateInventory(id, quantity) {
        return Product.findByIdAndUpdate(
            id,
            { $inc: { inventory: quantity } },
            { new: true }
        ).lean()
    },

    async delete(id) {
        return Product.findByIdAndUpdate(id, { isActive: false }, { new: true }).lean()
    },
}

export default productRepository
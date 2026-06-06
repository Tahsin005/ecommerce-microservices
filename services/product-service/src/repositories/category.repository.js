import Category from '../models/category.model.js'

const categoryRepository = {
    async findAll() {
        return Category.find().lean()
    },

    async findById(id) {
        return Category.findById(id).lean()
    },

    async findBySlug(slug) {
        return Category.findOne({ slug }).lean()
    },

    async create(data) {
        const category = await Category.create(data)
        return category.toObject()
    },

    async update(id, data) {
        return Category.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).lean()
    },

    async delete(id) {
        return Category.findByIdAndDelete(id).lean()
    },
}

export default categoryRepository
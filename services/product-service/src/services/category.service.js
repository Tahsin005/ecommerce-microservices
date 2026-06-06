import categoryRepository from '../repositories/category.repository.js'
import { AppError } from '@ecommerce/common'

const categoryService = {
    async getAll() {
        return categoryRepository.findAll()
    },

    async getById(id) {
        const category = await categoryRepository.findById(id)
        if (!category) throw new AppError('Category not found', 404)
        return category
    },

    async create(data) {
        const existing = await categoryRepository.findBySlug(
            data.name.toLowerCase().replace(/\s+/g, '-')
        )
        if (existing) throw new AppError('Category already exists', 409)
        return categoryRepository.create(data)
    },

    async update(id, data) {
        const category = await categoryRepository.update(id, data)
        if (!category) throw new AppError('Category not found', 404)
        return category
    },

    async delete(id) {
        const category = await categoryRepository.delete(id)
        if (!category) throw new AppError('Category not found', 404)
        return category
    },
}

export default categoryService
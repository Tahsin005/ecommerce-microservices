import productRepository from '../repositories/product.repository.js'
import categoryRepository from '../repositories/category.repository.js'
import { AppError } from '@ecommerce/common'

const productService = {
    async getAll(filters) {
        return productRepository.findAll(filters)
    },

    async getById(id) {
        const product = await productRepository.findById(id)
        if (!product) throw new AppError('Product not found', 404)
        return product
    },

    async getBySlug(slug) {
        const product = await productRepository.findBySlug(slug)
        if (!product) throw new AppError('Product not found', 404)
        return product
    },

    async create(data) {
        const category = await categoryRepository.findById(data.category)
        if (!category) throw new AppError('Category not found', 404)
        return productRepository.create(data)
    },

    async update(id, data) {
        if (data.category) {
            const category = await categoryRepository.findById(data.category)
            if (!category) throw new AppError('Category not found', 404)
        }
        const product = await productRepository.update(id, data)
        if (!product) throw new AppError('Product not found', 404)
        return product
    },

    async delete(id) {
        const product = await productRepository.delete(id)
        if (!product) throw new AppError('Product not found', 404)
        return product
    },

    async updateInventory(id, quantity) {
        const product = await productRepository.findById(id)
        if (!product) throw new AppError('Product not found', 404)

        if (product.inventory + quantity < 0) {
            throw new AppError('Insufficient inventory', 400)
        }

        return productRepository.updateInventory(id, quantity)
    },
}

export default productService
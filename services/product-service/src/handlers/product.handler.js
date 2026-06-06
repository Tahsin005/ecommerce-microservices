import productService from '../services/product.service.js'

const productHandler = {
    async getAll(req, res, next) {
        try {
            const { page, limit, category, search } = req.query
            const result = await productService.getAll({ page, limit, category, search })
            res.status(200).json({ success: true, data: result })
        } catch (err) {
            next(err)
        }
    },

    async getById(req, res, next) {
        try {
            const product = await productService.getById(req.params.id)
            res.status(200).json({ success: true, data: product })
        } catch (err) {
            next(err)
        }
    },

    async getBySlug(req, res, next) {
        try {
            const product = await productService.getBySlug(req.params.slug)
            res.status(200).json({ success: true, data: product })
        } catch (err) {
            next(err)
        }
    },

    async create(req, res, next) {
        try {
            const product = await productService.create(req.body)
            res.status(201).json({ success: true, data: product })
        } catch (err) {
            next(err)
        }
    },

    async update(req, res, next) {
        try {
            const product = await productService.update(req.params.id, req.body)
            res.status(200).json({ success: true, data: product })
        } catch (err) {
            next(err)
        }
    },

    async delete(req, res, next) {
        try {
            await productService.delete(req.params.id)
            res.status(204).send()
        } catch (err) {
            next(err)
        }
    },
}

export default productHandler
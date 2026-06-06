import categoryService from '../services/category.service.js'

const categoryHandler = {
    async getAll(req, res, next) {
        try {
            const categories = await categoryService.getAll()
            res.status(200).json({ success: true, data: categories })
        } catch (err) {
            next(err)
        }
    },

    async getById(req, res, next) {
        try {
            const category = await categoryService.getById(req.params.id)
            res.status(200).json({ success: true, data: category })
        } catch (err) {
            next(err)
        }
    },

    async create(req, res, next) {
        try {
            const category = await categoryService.create(req.body)
            res.status(201).json({ success: true, data: category })
        } catch (err) {
            next(err)
        }
    },

    async update(req, res, next) {
        try {
            const category = await categoryService.update(req.params.id, req.body)
            res.status(200).json({ success: true, data: category })
        } catch (err) {
            next(err)
        }
    },

    async delete(req, res, next) {
        try {
            await categoryService.delete(req.params.id)
            res.status(204).send()
        } catch (err) {
            next(err)
        }
    },
}

export default categoryHandler
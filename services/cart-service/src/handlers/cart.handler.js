import cartService from '../services/cart.service.js'

const cartHandler = {
  async getCart(req, res, next) {
    try {
      const cart = await cartService.getCart(req.user.sub)
      res.status(200).json({ success: true, data: cart })
    } catch (err) {
      next(err)
    }
  },

  async addItem(req, res, next) {
    try {
      const cart = await cartService.addItem(req.user.sub, req.body)
      res.status(200).json({ success: true, data: cart })
    } catch (err) {
      next(err)
    }
  },

  async updateItem(req, res, next) {
    try {
      const { productId } = req.params
      const { quantity } = req.body
      const cart = await cartService.updateItem(req.user.sub, productId, quantity)
      res.status(200).json({ success: true, data: cart })
    } catch (err) {
      next(err)
    }
  },

  async removeItem(req, res, next) {
    try {
      const cart = await cartService.removeItem(req.user.sub, req.params.productId)
      res.status(200).json({ success: true, data: cart })
    } catch (err) {
      next(err)
    }
  },

  async clearCart(req, res, next) {
    try {
      const result = await cartService.clearCart(req.user.sub)
      res.status(200).json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
}

export default cartHandler
import Cart from '../models/cart.model.js'

const cartRepository = {
  async findByUserId(userId) {
    return Cart.findOne({ userId }).lean()
  },

  async upsert(userId, items) {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true, upsert: true, runValidators: true }
    )
    return cart.toObject()
  },

  async delete(userId) {
    return Cart.findOneAndDelete({ userId }).lean()
  },
}

export default cartRepository
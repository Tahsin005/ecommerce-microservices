import Cart from '../models/cart.model.js'

const cartRepository = {
  async findByUserId(userId) {
    return Cart.findOne({ userId }).lean()
  },

  async upsert(userId, items) {
    let cart = await Cart.findOne({ userId })

    if (cart) {
      cart.items = items
    } else {
      cart = new Cart({ userId, items })
    }

    await cart.save() 
    return cart.toObject()
  },

  async delete(userId) {
    return Cart.findOneAndDelete({ userId }).lean()
  },
}

export default cartRepository
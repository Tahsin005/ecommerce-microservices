import cartRepository from '../repositories/cart.repository.js'
import productClient from '../grpc/product.client.js'
import { AppError } from '@ecommerce/common'

const cartService = {
  async getCart(userId) {
    const cart = await cartRepository.findByUserId(userId)
    return cart || { userId, items: [], totalPrice: 0 }
  },

  async addItem(userId, { productId, quantity }) {
    // validate product exists and is active
    const product = await productClient.getProduct(productId)
    if (!product.isActive) throw new AppError('Product is not available', 400)

    // check stock
    const { available } = await productClient.checkStock(productId, quantity)
    if (!available) throw new AppError('Insufficient stock', 400)

    const cart = await cartRepository.findByUserId(userId) || { userId, items: [] }

    const existingIndex = cart.items.findIndex(i => i.productId === productId)

    if (existingIndex > -1) {
      // product already in cart — increase quantity
      const newQuantity = cart.items[existingIndex].quantity + quantity

      // recheck stock for updated quantity
      const stockCheck = await productClient.checkStock(productId, newQuantity)
      if (!stockCheck.available) throw new AppError('Insufficient stock', 400)

      cart.items[existingIndex].quantity = newQuantity
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
      })
    }

    return cartRepository.upsert(userId, cart.items)
  },

  async updateItem(userId, productId, quantity) {
    const cart = await cartRepository.findByUserId(userId)
    if (!cart) throw new AppError('Cart not found', 404)

    const itemIndex = cart.items.findIndex(i => i.productId === productId)
    if (itemIndex === -1) throw new AppError('Item not found in cart', 404)

    if (quantity <= 0) {
      // remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1)
    } else {
      const { available } = await productClient.checkStock(productId, quantity)
      if (!available) throw new AppError('Insufficient stock', 400)
      cart.items[itemIndex].quantity = quantity
    }

    return cartRepository.upsert(userId, cart.items)
  },

  async removeItem(userId, productId) {
    const cart = await cartRepository.findByUserId(userId)
    if (!cart) throw new AppError('Cart not found', 404)

    const filtered = cart.items.filter(i => i.productId !== productId)
    if (filtered.length === cart.items.length) {
      throw new AppError('Item not found in cart', 404)
    }

    return cartRepository.upsert(userId, filtered)
  },

  async clearCart(userId) {
    const cart = await cartRepository.delete(userId)
    if (!cart) throw new AppError('Cart not found', 404)
    return { message: 'Cart cleared' }
  },
}

export default cartService
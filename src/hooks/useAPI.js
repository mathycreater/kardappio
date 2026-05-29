import { useCallback, useState, useEffect } from 'react'
import products from '../data/products'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const useAPI = () => {
  const getItems = useCallback(() => delay(800).then(() => products), [])
  return { getItems }
}

export const useCartAPI = () => {
  const [cartItems, setCartItems] = useState([])
  const [cartMessage, setCartMessage] = useState('')

  const fetchCart = useCallback(async () => {
    await delay(300)
    const stored = localStorage.getItem('@kardappio:cart')
    setCartItems(stored ? JSON.parse(stored) : [])
  }, [])

  useEffect(() => {
    const init = async () => {
      await fetchCart()
    }
    init()

    const handleUpdate = () => fetchCart()
    const handleMessage = (e) => {
      setCartMessage(e.detail)
      setTimeout(() => setCartMessage(''), 2500)
    }

    window.addEventListener('cart_updated', handleUpdate)
    window.addEventListener('cart_message', handleMessage)

    return () => {
      window.removeEventListener('cart_updated', handleUpdate)
      window.removeEventListener('cart_message', handleMessage)
    }
  }, [fetchCart])

  const addToCart = async (product) => {
    await delay(200)
    const stored = localStorage.getItem('@kardappio:cart')
    const currentCart = stored ? JSON.parse(stored) : []

    const totalItems = currentCart.reduce((acc, item) => acc + item.quantity, 0)
    if (totalItems >= 10) {
      window.dispatchEvent(new CustomEvent('cart_message', { detail: 'Limite de pedidos atingido' }))
      return
    }

    const existingItem = currentCart.find(
      (item) => item.id === product.id && item.selectedExtra === product.selectedExtra
    )

    let updatedCart
    if (existingItem) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id && item.selectedExtra === product.selectedExtra
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }]
    }

    localStorage.setItem('@kardappio:cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cart_updated'))
  }

  const removeFromCart = async (productId, extra) => {
    await delay(200)
    const stored = localStorage.getItem('@kardappio:cart')
    if (!stored) return
    const currentCart = JSON.parse(stored)

    const existingItem = currentCart.find(
      (item) => item.id === productId && item.selectedExtra === extra
    )

    if (!existingItem) return

    let updatedCart
    if (existingItem.quantity > 1) {
      updatedCart = currentCart.map((item) =>
        item.id === productId && item.selectedExtra === extra
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    } else {
      updatedCart = currentCart.filter(
        (item) => !(item.id === productId && item.selectedExtra === extra)
      )
    }

    localStorage.setItem('@kardappio:cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cart_updated'))
  }

  return { cartItems, cartMessage, addToCart, removeFromCart }
}
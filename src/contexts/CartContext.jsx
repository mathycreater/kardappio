import { createContext, useContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [cartMessage, setCartMessage] = useState('')

  function getTotalItems(cart) {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  function showCartMessage(msg) {
    setCartMessage(msg)
    setTimeout(() => setCartMessage(''), 2500)
  }

  function addToCart(product) {
    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.selectedExtra === product.selectedExtra
    )
    const totalItems = getTotalItems(cartItems)

    if (totalItems >= 10) {
      showCartMessage('Limite de pedidos atingido')
      return
    }

    let updatedCart

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id && item.selectedExtra === product.selectedExtra
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }]
    }

    setCartItems(updatedCart)
  }

  function removeFromCart(productId, extra) {
    const existingItem = cartItems.find(
      (item) => item.id === productId && item.selectedExtra === extra
    )

    if (!existingItem) return

    let updatedCart

    if (existingItem.quantity > 1) {
      updatedCart = cartItems.map((item) =>
        item.id === productId && item.selectedExtra === extra
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    } else {
      updatedCart = cartItems.filter(
        (item) => !(item.id === productId && item.selectedExtra === extra)
      )
    }

    setCartItems(updatedCart)
  }

  return (
    <CartContext.Provider value={{ cartItems, cartMessage, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

import { useState } from 'react'

import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Products from './components/Products'
import Cart from './components/Cart'
import './styles/Feedback.css'

function App() {

  const [cartItems, setCartItems] = useState([])
  const [cartMessage, setCartMessage] = useState("")

  function getTotalItems(cart) {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }
  
  function showCartMessage(msg) {
    setCartMessage(msg)

    setTimeout(() => {
      setCartMessage("")
    }, 2500)
  }

  function clearCartMessage(){
    setCartMessage("")
  }

  function addToCart(product) {

  const existingItem = cartItems.find(
    (item) => item.id === product.id
  )

  const totalItems = getTotalItems(cartItems)

  if (totalItems >= 10) {
    showCartMessage("Limite de pedidos atingido")
    return
  }

  let updatedCart

  if (existingItem) {

    updatedCart = cartItems.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )

  } else {

    updatedCart = [
      ...cartItems,
      { ...product, quantity: 1 },
    ]
  }

  setCartItems(updatedCart)
  clearCartMessage()
}
  function removeFromCart(productId) {

    const existingItem = cartItems.find(
      (item) => item.id === productId
    )

    if (!existingItem) return

    let updatedCart

    if (existingItem.quantity > 1) {

      updatedCart = cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )

    } else {

      updatedCart = cartItems.filter(
        (item) => item.id !== productId
      )
    }

    setCartItems(updatedCart)
    clearCartMessage()
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Features />

      <Products addToCart={addToCart} />

      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        cartMessage={cartMessage}
      />
    </>
  )
}

export default App
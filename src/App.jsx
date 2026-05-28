import { Routes, Route } from 'react-router-dom'
import { useCart } from './hooks/useCart'

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import { Checkout } from './pages/Checkout/Checkout'

function Home({ cartItems, addToCart, removeFromCart, cartMessage }) {
  return (
    <>
      <Hero />
      <Features />
      <Products addToCart={addToCart} />
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        cartMessage={cartMessage}
      />
      <Footer />
    </>
  )
}

function App() {
  const { cartItems, cartMessage, addToCart, removeFromCart } = useCart()

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartMessage={cartMessage}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
      </Routes>
    </>
  )
}

export default App
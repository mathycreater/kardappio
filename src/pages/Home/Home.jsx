import Hero from '../../components/Hero/Hero'
import Features from '../../components/Features/Features'
import Products from '../../components/Products/Products'
import Cart from '../../components/Cart/Cart'
import Footer from '../../components/Footer/Footer'
import { useProducts } from '../../components/Products/useProducts'

export function Home() {
  const { products, loading } = useProducts()

  return (
    <>
      <Hero />
      <Features />
      <Products products={products} loading={loading} />
      <Cart />
      <Footer />
    </>
  )
}

import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isCheckout = location.pathname === '/checkout'

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>Kardappio</h2>

      <ul className={styles['nav-links']}>
        <li><a onClick={() => scrollTo('hero')}>Home</a></li>
        <li><a onClick={() => scrollTo('features')}>Soluções</a></li>
        <li><a onClick={() => scrollTo('products')}>Produtos</a></li>
        <li><a onClick={() => scrollTo('cart')}>Carrinho</a></li>
      </ul>

      {!isCheckout && (
        <button className={styles['nav-button']} onClick={() => scrollTo('products')}>
          Começar
        </button>
      )}
    </nav>
  )
}

export default Navbar
import products from '../../data/products'
import ProductCard from '../ProductCard/ProductCard'

import styles from './Products.module.css'

function Products({ addToCart }) {
  return (
    <section id="products" className={styles.products}>

      <div className={styles['products-title']}>
        <h2>Produtos em destaque</h2>

        <p>
          Demonstração de catálogo integrado.
        </p>
      </div>

      <div className={styles['products-grid']}>

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}

      </div>
    </section>
  )
}

export default Products
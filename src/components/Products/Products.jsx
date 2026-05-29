import ProductCard from '../ProductCard/ProductCard'

import styles from './Products.module.css'

function Products({ products, loading }) {
  return (
    <section id="products" className={styles.products}>

      <div className={styles['products-title']}>
        <h2>Produtos em destaque</h2>

        <p>
          Demonstração de catálogo integrado.
        </p>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div className={styles['products-grid']}>

          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>
      )}
    </section>
  )
}

export default Products
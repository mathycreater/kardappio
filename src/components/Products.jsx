import products from '../data/products'
import ProductCard from './ProductCard'

import '../styles/Products.css'

function Products() {
  return (
    <section className="products">

      <div className="products-title">
        <h2>Produtos em destaque</h2>

        <p>
          Demonstração de catálogo integrado.
        </p>
      </div>

      <div className="products-grid">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>
    </section>
  )
}

export default Products
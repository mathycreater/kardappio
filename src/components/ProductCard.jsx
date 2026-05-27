import '../styles/ProductCard.css'

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-info">

        <h3>{product.name}</h3>

        <p>
          R$ {product.price.toFixed(2)}
        </p>

        <button onClick ={() => addToCart(product)}>
          Adicionar
        </button>

      </div>
    </div>
  )
}

export default ProductCard
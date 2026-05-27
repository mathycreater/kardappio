import '../styles/ProductCard.css'

function ProductCard({ product }) {
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

        <button>
          Adicionar
        </button>

      </div>
    </div>
  )
}

export default ProductCard
import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import styles from './ProductCard.module.css'

function ProductCard({ product }) {
  const [showExtras, setShowExtras] = useState(false)
  const { addToCart } = useCart()

  function handleAdd() {
    if (product.extras?.length) {
      setShowExtras(true)
    } else {
      addToCart(product)
    }
  }

  function handleExtraSelect(extra) {
    addToCart({ ...product, selectedExtra: extra })
    setShowExtras(false)
  }

  return (
    <div className={styles['product-card']}>

      <img
        src={product.image}
        alt={product.name}
      />

      <div className={styles['product-info']}>

        <h3>{product.name}</h3>

        <p>
          R$ {product.price.toFixed(2)}
        </p>

        {showExtras ? (
          <div className={styles.extras}>
            <p className={styles['extras-label']}>Escolha um adicional:</p>

            {product.extras.map((extra) => (
              <button
                key={extra}
                className={styles['extra-option']}
                onClick={() => handleExtraSelect(extra)}
              >
                {extra}
              </button>
            ))}

            <button
              className={styles['extra-skip']}
              onClick={() => handleExtraSelect(null)}
            >
              Sem adicional
            </button>
          </div>
        ) : (
          <button onClick={handleAdd}>
            Adicionar
          </button>
        )}

      </div>
    </div>
  )
}

export default ProductCard
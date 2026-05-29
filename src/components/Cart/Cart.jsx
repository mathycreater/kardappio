import { useNavigate } from 'react-router-dom'
import { useCartAPI } from '../../hooks/useAPI'
import styles from './Cart.module.css'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, cartMessage } = useCartAPI()

  if (!cartItems) return null

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <section id="cart" className={styles.cart}>

      <h2>Carrinho</h2>

      {cartMessage && (
        <div className={styles['cart-warning']}>
          {cartMessage}
        </div>
      )}

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className={styles['cart-list']}>

            {cartItems.map((item) => (

              <div
                className={styles['cart-item']}
                key={`${item.id}-${item.selectedExtra}`}
              >

                <div>
                  <h3>{item.name}</h3>

                  {item.selectedExtra && (
                    <p className={styles['item-extra']}>{item.selectedExtra}</p>
                  )}

                  <p>Quantidade: {item.quantity}</p>
                </div>

                <div className={styles['cart-actions']}>

                  <span>
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button onClick={() => removeFromCart(item.id, item.selectedExtra)}>
                    Remover
                  </button>

                </div>
              </div>
            ))}

          </div>

          <h3 className={styles['cart-total']}>
            Total: R$ {total.toFixed(2)}
          </h3>

          <button
            className={styles['checkout-button']}
            onClick={() => navigate('/checkout')}
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </section>
  )
}

export default Cart
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartAPI } from '../../hooks/useAPI'
import { useCheckout } from './useCheckout'
import styles from './Checkout.module.css'

export const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, cartLoaded } = useCartAPI()
  const {
    confirmed,
    address,
    setAddress,
    checkoutItems,
    total,
    deliveryEstimate,
    handleConfirm
  } = useCheckout(cartItems)

  useEffect(() => {
    if (cartLoaded && cartItems.length === 0) {
      navigate('/')
    }
  }, [cartLoaded, cartItems, navigate])

  if (!cartLoaded) {
    return (
      <div className={styles.loading}>
        <div className={styles['loading-bar']} />
        <p>Carregando...</p>
      </div>
    )
  }

  if (confirmed) {
    return (
      <section className={styles.checkout}>

        <div className={styles.receipt}>
          <h2>Pedido confirmado</h2>

          <p className={styles['receipt-address']}>
            Entrega para: <strong>{address}</strong>
          </p>

          <div className={styles['receipt-items']}>
            <h3>Você comprou:</h3>

            {checkoutItems.map((item) => (
              <div key={`${item.id}-${item.selectedExtra}`} className={styles['receipt-item']}>
                <span>{item.name}</span>
                {item.selectedExtra && (
                  <span className={styles['receipt-extra']}> ({item.selectedExtra})</span>
                )}
                {item.quantity > 1 && (
                  <span className={styles['receipt-qty']}> x{item.quantity}</span>
                )}
              </div>
            ))}
          </div>

          <div className={styles['receipt-total']}>
            Total: <strong>R$ {total.toFixed(2)}</strong>
          </div>

          <div className={styles['receipt-estimate']}>
            Estimativa de entrega: <strong>{deliveryEstimate}</strong>
          </div>

          <button className={styles.back} onClick={() => navigate('/')}>
            Voltar ao início
          </button>
        </div>

      </section>
    )
  }

  return (
    <section className={styles.checkout}>

      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>
          ← Voltar
        </button>
        <h2>Finalizar Pedido</h2>
      </div>

      <div className={styles['address-block']}>
        <label htmlFor="address">Endereço de entrega</label>
        <input
          id="address"
          type="text"
          placeholder="Rua, número, bairro, cidade"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles['address-input']}
        />
      </div>

      {checkoutItems.length === 0 ? (
        <p className={styles.empty}>Nenhum item no carrinho.</p>
      ) : (
        <>
          <div className={styles.list}>
            {checkoutItems.map((item) => (
              <div key={`${item.id}-${item.selectedExtra}`} className={styles.item}>
                <img src={item.image} alt={item.name} />

                <div className={styles['item-info']}>
                  <h3>{item.name}</h3>

                  {item.selectedExtra && (
                    <p className={styles['item-extra']}>{item.selectedExtra}</p>
                  )}

                  {item.quantity && <p>Quantidade: {item.quantity}</p>}
                </div>

                <span className={styles.price}>
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h3>Total: R$ {total.toFixed(2)}</h3>

            <button
              className={styles.confirm}
              onClick={handleConfirm}
              disabled={!address.trim()}
            >
              Confirmar Pedido
            </button>
          </div>

          {!address.trim() && (
            <p className={styles['address-hint']}>
              Preencha o endereço de entrega para continuar.
            </p>
          )}
        </>
      )}
    </section>
  )
}
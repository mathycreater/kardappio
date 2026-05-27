import '../styles/Cart.css'

function Cart({ cartItems, removeFromCart, cartMessage }) {

  const total = cartItems.reduce(
    (accumulator, item) =>
      accumulator + item.price * item.quantity,
    0
  )

  return (
    <section className="cart">

      <h2>Carrinho</h2>

      {cartMessage && (
        <p className="cart-warning">
          {cartMessage}
        </p>

      )}

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="cart-list">

            {cartItems.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    Quantidade: {item.quantity}
                  </p>
                </div>

                <div className="cart-actions">

                  <span>
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>

                </div>
              </div>
            ))}

          </div>

          <h3 className="cart-total">
            Total: R$ {total.toFixed(2)}
          </h3>
        </>
      )}
    </section>
  )
}

export default Cart
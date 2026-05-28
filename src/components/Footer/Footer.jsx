import styles from './Footer.module.css'

function Footer() {
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>

      <div className={styles['footer-content']}>

        <div className={styles['footer-brand']}>
          <h2>Kardappio</h2>

          <p>
            Plataforma SaaS para pedidos e integração de restaurantes.
          </p>
        </div>

        <div className={styles['footer-links']}>

          <a onClick={() => scrollTo('hero')}>
            Início
          </a>

          <a onClick={() => scrollTo('products')}>
            Produtos
          </a>

        </div>

        <div className={styles['footer-contact']}>

          <p>contato@kardappio.com</p>

          <p>(19) 99999-9999</p>

        </div>

      </div>

      <div className={styles['footer-bottom']}>
        <p>
          © 2026 Kardappio. Todos os direitos reservados.
        </p>
      </div>

    </footer>
  )
}

export default Footer
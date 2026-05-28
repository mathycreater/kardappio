import styles from './Hero.module.css'
import heroBanner from '../../assets/hero-banner.jpg'

function Hero() {
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles['hero-content']}>
        <h1>
          Automatize pedidos e integre seu restaurante com facilidade
        </h1>

        <p>
          Plataforma moderna para gestão de pedidos, integração de APIs e
          controle inteligente de operações.
        </p>

        <div className={styles['hero-buttons']}>
          <button
            className={styles['primary-button']}
            onClick={() => scrollTo('products')}
          >
            Começar agora
          </button>

          <button
            className={styles['secondary-button']}
            onClick={() => scrollTo('features')}
          >
            Ver soluções
          </button>
        </div>
      </div>

      <div className={styles['hero-image']}>
        <img
          src={heroBanner}
          alt="Dashboard de restaurante"
        />
      </div>
    </section>
  )
}

export default Hero
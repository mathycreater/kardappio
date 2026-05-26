import '../styles/Hero.css'
import heroBanner from '../assets/hero-banner.jpg'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Automatize pedidos e integre seu restaurante com facilidade
        </h1>

        <p>
          Plataforma moderna para gestão de pedidos, integração de APIs e
          controle inteligente de operações.
        </p>

        <div className="hero-buttons">
          <button className="primary-button">
            Começar agora
          </button>

          <button className="secondary-button">
            Ver soluções
          </button>
        </div>
      </div>

      <div className="hero-image">
        <img
          src={heroBanner}
          alt="Dashboard de restaurante"
        />
      </div>
    </section>
  )
}

export default Hero
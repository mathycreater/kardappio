import '../styles/Features.css'

function Features() {
  return (
    <section className="features">

      <div className="features-title">
        <h2>Soluções inteligentes para restaurantes</h2>

        <p>
          Automatize pedidos, integre sistemas e acompanhe operações em tempo real.
        </p>
      </div>

      <div className="features-grid">

        <div className="feature-card">
          <h3>Integração de Pedidos</h3>

          <p>
            Centralize pedidos de múltiplas plataformas em um único sistema.
          </p>
        </div>

        <div className="feature-card">
          <h3>Gestão Operacional</h3>

          <p>
            Controle fluxo de pedidos, cozinha e entregas com eficiência.
          </p>
        </div>

        <div className="feature-card">
          <h3>Dashboard Inteligente</h3>

          <p>
            Visualize métricas e acompanhe resultados em tempo real.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Features
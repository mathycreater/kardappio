import styles from './Features.module.css'

function Features() {
  return (
    <section id="features" className={styles.features}>

      <div className={styles['features-title']}>
        <h2>Soluções inteligentes para restaurantes</h2>

        <p>
          Automatize pedidos, integre sistemas e acompanhe operações em tempo real.
        </p>
      </div>

      <div className={styles['features-grid']}>

        <div className={styles['feature-card']}>
          <h3>Integração de Pedidos</h3>

          <p>
            Centralize pedidos de múltiplas plataformas em um único sistema.
          </p>
        </div>

        <div className={styles['feature-card']}>
          <h3>Gestão Operacional</h3>

          <p>
            Controle fluxo de pedidos, cozinha e entregas com eficiência.
          </p>
        </div>

        <div className={styles['feature-card']}>
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
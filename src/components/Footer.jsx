import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">
          <h2>Kardappio</h2>

          <p>
            Plataforma SaaS para pedidos e integração de restaurantes.
          </p>
        </div>

        <div className="footer-links">

          <a href="#">
            Início
          </a>

          <a href="#">
            Produtos
          </a>

          <a href="#">
            Contato
          </a>

        </div>

        <div className="footer-contact">

          <p>contato@kardappio.com</p>

          <p>(19) 99999-9999</p>

        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Kardappio. Todos os direitos reservados.
        </p>
      </div>

    </footer>
  )
}

export default Footer
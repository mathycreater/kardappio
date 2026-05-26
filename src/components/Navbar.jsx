import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Kardappio</h2>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Soluções</a></li>
        <li><a href="#">Produtos</a></li>
        <li><a href="#">Contato</a></li>
      </ul>

      <button className="nav-button">
        Começar
      </button>
    </nav>
  )
}

export default Navbar
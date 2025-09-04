import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Branding */}
        <div className="footer-section">
          <h3>D'JAVI ESPORT</h3>
          <p>Gaming, eSports y comunidad en un solo lugar.</p>
        </div>

        {/* Enlaces */}
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="/"><span className="material-icons">home</span> Inicio</a></li>
            <li><a href="/about"><span className="material-icons">info</span> Acerca de</a></li>
            <li><a href="/contact"><span className="material-icons">mail</span> Contacto</a></li>
            <li><a href="/privacy"><span className="material-icons">gavel</span> Política de privacidad</a></li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div className="footer-section">
          <h4>Síguenos</h4>
          <ul className="social-links">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <span className="material-icons">facebook</span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <span className="material-icons">twitter</span>
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <span className="material-icons">photo_camera</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} D'JAVI ESPORT. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

// src/components/Footer.tsx

import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <p>&copy; {currentYear} D'JAVI ESPORT. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
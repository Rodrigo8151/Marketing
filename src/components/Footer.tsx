import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import './Footer.css'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // --- LÓGICA PARA EL NEWSLETTER ---
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que la página se recargue
    if (email.trim() === '') return; // No hacer nada si el email está vacío
    
    // Aquí iría la lógica para enviar el email a tu servicio de marketing
    console.log('Email suscrito:', email);

    setIsSubmitted(true); // Cambia el estado para mostrar el mensaje y deshabilitar
  };

  return (
    <footer className="footer-container">
      <div className="footer-main">
        {/* --- COLUMNA 1: INSTITUCIONAL --- */}
        <div className="footer-column">
          <h4>NOSOTROS</h4>
          <ul>
            {/* --- ENLACES FUNCIONALES --- */}
            <li><Link to="/nosotros">Nuestra Historia</Link></li>
            <li><Link to="/testimonios">Testimonios</Link></li>
            {/* --- Enlaces de demostración --- */}
            <li><a href="/productos?categoria=nuevo">Tiendas</a></li>
            <li><a href="#">Trabaja con nosotros</a></li>
          </ul>
        </div>

        {/* --- COLUMNA 2: AYUDA / LEGALES --- */}
        <div className="footer-column">
          <h4>AYUDA</h4>
          <ul>
            <li><a href="#">Preguntas Frecuentes</a></li>
            <li><a href="#">Envíos y Devoluciones</a></li>
            <li><a href="#">Políticas de Privacidad</a></li>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Libro de Reclamaciones</a></li>
          </ul>
        </div>

        {/* --- COLUMNA 3: COMUNIDAD --- */}
        <div className="footer-column">
          <h4>ÚNETE</h4>
          <ul>
            {/* --- ENLACES FUNCIONALES --- */}
            <li><Link to="/blog">Nuestro Blog</Link></li>
            <li><Link to="/club-vip">Club VIP WhatsApp</Link></li>
            <li><Link to="/guia-cuidado-zapatillas">Guía Gratuita</Link></li>
          </ul>
        </div>

        {/* --- COLUMNA 4: NEWSLETTER Y REDES --- */}
        <div className="footer-column">
          <h4>NEWSLETTER</h4>
          {!isSubmitted ? (
            <p>¡Suscríbete y recibe nuestras novedades!</p>
          ) : null}
          
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="Ingresa tu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitted}
              required 
            />
            <button type="submit" disabled={isSubmitted}>
              {isSubmitted ? 'SUSCRITO' : 'SUSCRIBIRME'}
            </button>
          </form>

          {isSubmitted && (
            <p className="newsletter-success">
              ¡Gracias por suscribirte! Revisa tu bandeja de entrada.
            </p>
          )}

          <div className="footer-social-icons">
             <a href="https://www.instagram.com/djavieesport?igsh=MWZjNDFtbXB5NnFmMQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
             <a href="https://www.tiktok.com/@d.javie.esport?_t=ZS-8zYsFwYfsWY&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright-text">&copy; {currentYear} D'JAVI ESPORT. Todos los derechos reservados.</p>
        <div className="payment-icons">
          <FaCcVisa title="Visa"/>
          <FaCcMastercard title="Mastercard"/>
          <FaCcAmex title="American Express"/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
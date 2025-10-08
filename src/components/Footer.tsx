import React, { useState } from 'react'; // Se importa React
import { Link } from 'react-router-dom';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import './Footer.css'; 

// --- FUNCIÓN AUXILIAR PARA NETLIFY ---
const encode = (data: { [key: string]: string }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // --- LÓGICA ACTUALIZADA PARA EL NEWSLETTER CON NETLIFY ---
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim() === '') return;
    
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Enviamos el correo a Netlify en segundo plano
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "newsletter-signup", // Nombre del formulario para Netlify
          "email": email
        })
      });

      // Si el envío fue exitoso, actualizamos el estado
      setIsSubmitted(true);
      setSubmitMessage("¡Gracias por suscribirte! Revisa tu bandeja de entrada.");

    } catch (error) {
      console.error("Error al suscribirse al newsletter:", error);
      setSubmitMessage("Hubo un error. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-main">
        {/* --- COLUMNA 1: INSTITUCIONAL --- */}
        <div className="footer-column">
          <h4>NOSOTROS</h4>
          <ul>
            <li><Link to="/nosotros">Nuestra Historia</Link></li>
            <li><Link to="/testimonios">Testimonios</Link></li>
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
            <li><Link to="/blog">Nuestro Blog</Link></li>
            <li><Link to="/club-vip">Club VIP WhatsApp</Link></li>
            <li><Link to="/guia-cuidado-zapatillas">Guía Gratuita</Link></li>
          </ul>
        </div>

        {/* --- COLUMNA 4: NEWSLETTER Y REDES --- */}
        <div className="footer-column">
          <h4>NEWSLETTER</h4>
          {!isSubmitted && <p>¡Suscríbete y recibe nuestras novedades!</p>}
          
          {/* Formulario adaptado para Netlify */}
          <form 
            name="newsletter-signup"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="newsletter-form" 
            onSubmit={handleNewsletterSubmit}
          >
            {/* Campos ocultos requeridos por Netlify */}
            <input type="hidden" name="form-name" value="newsletter-signup" />
            <p hidden><label>No llenar: <input name="bot-field" /></label></p>
            
            <input 
              type="email" 
              name="email" // Atributo 'name' es crucial
              placeholder="Ingresa tu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitted || isSubmitting} // Deshabilitado al enviar y al tener éxito
              required 
            />
            <button type="submit" disabled={isSubmitted || isSubmitting}>
              {isSubmitting ? 'ENVIANDO...' : (isSubmitted ? 'SUSCRITO' : 'SUSCRIBIRME')}
            </button>
          </form>

          {/* Mensajes de éxito o error */}
          {submitMessage && (
            <p className={isSubmitted ? "newsletter-success" : "newsletter-error"}>
              {submitMessage}
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
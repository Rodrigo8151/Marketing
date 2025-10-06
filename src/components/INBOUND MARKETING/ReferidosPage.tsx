// src/components/INBOUND MARKETING/ReferidosPage.tsx
import '../Inicio/HomePage.css';

const ReferidosPage = () => (
  <div className="portfolio-container">
    <div className="portfolio-header">
      <h2>Programa de <span>Referidos</span></h2>
      <p>¿Te encantan nuestras zapatillas? ¡Compártelo con tus amigos y ambos ganan! Es nuestra forma de darte las gracias.</p>
    </div>
    <div className="referidos-content">
      <h3>Cómo Funciona - ¡Es muy fácil!</h3>
      <div className="steps-grid">
        <div className="step-card"><span>1</span><h4>Regístrate</h4><p>Obtén tu enlace de referido único en segundos.</p></div>
        <div className="step-card"><span>2</span><h4>Comparte</h4><p>Envía tu enlace a tus amigos por WhatsApp, redes, etc.</p></div>
        <div className="step-card"><span>3</span><h4>Gana</h4><p>Tu amigo recibe un 15% de descuento en su primera compra, ¡y tú también obtienes un cupón del 15%!</p></div>
      </div>
      <button className="btn-submit">Generar mi Enlace de Referido</button>
    </div>
  </div>
);

export default ReferidosPage;
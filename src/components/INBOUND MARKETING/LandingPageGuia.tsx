// src/components/INBOUND MARKETING/LandingPageGuia.tsx
import '../Inicio/HomePage.css';

const LandingPageGuia = () => (
  <div className="landing-page">
    <div className="landing-content">
      <img src="/img/guia-portada.jpg" alt="Guía de Cuidado de Zapatillas" />
      <div>
        <h2>Descarga GRATIS la Guía Definitiva de Cuidado de Zapatillas</h2>
        <p>Aprende los secretos para duplicar la vida útil de tu calzado favorito. ¡Mantén tus zapatillas como nuevas!</p>
        <ul><li>Limpieza según el material</li><li>Trucos para eliminar olores</li><li>Almacenamiento correcto</li></ul>
        <form className="landing-form">
          <input type="email" placeholder="Tu mejor correo electrónico" required />
          <button type="submit" className="btn-submit">¡LA QUIERO AHORA!</button>
        </form>
      </div>
    </div>
  </div>
);

export default LandingPageGuia;
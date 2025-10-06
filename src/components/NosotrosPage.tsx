// src/components/NosotrosPage.tsx

// La línea 'import React from 'react';' ha sido eliminada porque no es necesaria.
import './Inicio/HomePage.css'; // <-- RUTA CORREGIDA para que encuentre el CSS

// Importamos los iconos que sí se usan en esta página
import { FaInstagram, FaTwitter, FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa';

// --- NUEVO COMPONENTE: NUESTRA HISTORIA ---
const NuestraHistoria = () => (
  <section className="nuestra-historia-container">
    <div className="historia-header">
      <h2>Nuestra <span>Historia</span></h2>
      <p>Nacimos de la pasión por el deporte y el estilo urbano. Creemos que cada paso cuenta y que las zapatillas adecuadas pueden llevarte más lejos. D'JAVI ESPORT no es solo una marca, es un movimiento.</p>
    </div>
    <div className="historia-content">
        <img src="/nuestra-tienda.jpg" alt="Interior de la tienda D'JAVI ESPORT" />
        <div>
            <h3>Misión y Visión</h3>
            <p><strong>Nuestra Misión:</strong> Equipar a atletas y entusiastas con calzado de la más alta calidad que combine rendimiento, innovación y diseño vanguardista.</p>
            <p><strong>Nuestra Visión:</strong> Ser la marca líder y referente en la comunidad deportiva y urbana, inspirando a las personas a alcanzar sus metas y a expresar su identidad única a través de nuestro estilo.</p>
        </div>
    </div>
  </section>
);


// --- SECCIÓN MAPA (MOVIDA DESDE HomePage) ---
const MapSection = () => {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.974559823998!2d-71.90649418951698!3d-13.53715208677774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916e7edf8692efd5%3A0xb2151ede7622f88b!2sUniversidad%20Andina%20del%20Cusco!5e0!3m2!1ses-419!2spe!4v1755482102341!5m2!1ses-419!2spe";
  return (
    <section id="map" className="map-container">
      <div className="map-header">
        <h2>Nuestras <span>Tiendas</span></h2>
        <p>Encuentra tu tienda D'JAVI ESPORT más cercana. Visítanos y vive una experiencia de compra única con asesoramiento personalizado de nuestros expertos.</p>
      </div>
      <div className="map-frame-container"><iframe src={mapEmbedUrl} style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de Tiendas D'JAVI ESPORT"></iframe></div>
    </section>
  );
};

// --- SECCIÓN SOCIAL (MOVIDA DESDE HomePage) ---
const socialLinks = [
  { name: 'Instagram', handle: '@djaviesport', url: '#', icon: <FaInstagram /> },
  { name: 'Twitter', handle: '@djaviesport', url: '#', icon: <FaTwitter /> },
  { name: 'Facebook', handle: 'D\'JAVI ESPORT', url: '#', icon: <FaFacebookF /> },
  { name: 'TikTok', handle: '@djaviesport', url: '#', icon: <FaTiktok /> },
  { name: 'YouTube', handle: 'D\'JAVI ESPORT TV', url: '#', icon: <FaYoutube /> },
];
const instagramFeedImages = ['/portfolio/p1.jpg', '/portfolio/p4.jpg', '/portfolio/p2.jpg', '/portfolio/p3.jpg', '/portfolio/p6.jpg', '/portfolio/p7.jpg'];
const Social = () => (
  <section id="social" className="social-container">
    <div className="social-header">
      <h2>Únete a nuestra <span>Comunidad</span></h2>
      <p>Síguenos en redes sociales para conocer los últimos lanzamientos, contenido exclusivo y formar parte de la familia D'JAVI ESPORT.</p>
    </div>
    <div className="social-cards-grid">
      {socialLinks.map((social) => (<a href={social.url} key={social.name} className="social-card" target="_blank" rel="noopener noreferrer"><div className="social-icon-wrapper">{social.icon}</div><h3>{social.name}</h3><p>{social.handle}</p></a>))}
    </div>
    <div className="instagram-feed">
      <h3>Lo último en Instagram</h3>
      <div className="instagram-grid">
        {instagramFeedImages.map((imgUrl, index) => (<a href="#" className="instagram-photo" key={index}><img src={imgUrl} alt={`Instagram post ${index + 1}`} /><div className="instagram-overlay"><FaInstagram style={{ width: '40px', height: '40px' }} /></div></a>))}
      </div>
    </div>
  </section>
);

// --- SECCIÓN CONTACTO (MOVIDA DESDE HomePage) ---
const Contact = () => (
  <section id="contact" className="contact-container">
    <div className="contact-header">
      <h2>Ponte en <span>Contacto</span></h2>
      <p>¿Tienes dudas, sugerencias o quieres colaborar con nosotros? Nuestro equipo está listo para ayudarte. ¡No dudes en escribirnos!</p>
    </div>
    <div className="contact-content-grid">
      <div className="contact-info-card">
        <h3>Información de Contacto</h3>
        <div className="info-item"><img src="/icons/email.svg" alt="Email" className="info-icon" /><div><h4>Atención al Cliente</h4><p>soporte@djaviesport.com</p></div></div>
        <div className="info-item"><img src="/icons/phone.svg" alt="Phone" className="info-icon" /><div><h4>Teléfono</h4><p>+51 984 954 028</p></div></div>
        <div className="info-item"><img src="/icons/location.svg" alt="Oficina" className="info-icon" /><div><h4>Oficina Central</h4><p>Av. General Gamarra #410, Quillabamba, Perú</p></div></div>
      </div>
      <div className="contact-form-card">
        <h3>Envíanos un Mensaje</h3>
        <form>
          <div className="form-group-split"><div className="form-group"><label htmlFor="name">Tu Nombre</label><input type="text" id="name" name="name" required /></div><div className="form-group"><label htmlFor="email">Tu Correo</label><input type="email" id="email" name="email" required /></div></div>
          <div className="form-group"><label htmlFor="subject">Asunto</label><input type="text" id="subject" name="subject" required /></div>
          <div className="form-group"><label htmlFor="message">Tu Mensaje</label><textarea id="message" name="message" rows={5} required></textarea></div>
          <button type="submit" className="btn-submit">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  </section>
);


// --- COMPONENTE PRINCIPAL QUE UNE LA PÁGINA "NOSOTROS" ---
const NosotrosPage = () => {
    return (
        <>
            <NuestraHistoria />
            <MapSection />
            <Social />
            <Contact />
        </>
    );
};

export default NosotrosPage;
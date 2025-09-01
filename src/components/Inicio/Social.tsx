// src/components/Social.tsx

import './Social.css';
// 1. Importa los iconos que necesitas de la librería
import { FaInstagram, FaTwitter, FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa';

// 2. Modifica el array para usar los componentes de iconos en lugar de una URL
const socialLinks = [
  { name: 'Instagram', handle: '@djaviesport', url: '#', icon: <FaInstagram /> },
  { name: 'Twitter', handle: '@djaviesport', url: '#', icon: <FaTwitter /> },
  { name: 'Facebook', handle: 'D\'JAVI ESPORT', url: '#', icon: <FaFacebookF /> },
  { name: 'TikTok', handle: '@djaviesport', url: '#', icon: <FaTiktok /> },
  { name: 'YouTube', handle: 'D\'JAVI ESPORT TV', url: '#', icon: <FaYoutube /> },
];

// El resto del componente no necesita grandes cambios
const instagramFeedImages = [
  '/portfolio/p1.jpg', '/portfolio/p4.jpg', '/portfolio/p2.jpg',
  '/portfolio/p3.jpg', '/portfolio/p6.jpg', '/portfolio/p7.jpg',
];

const Social = () => {
  return (
    <section id="social" className="social-container light-bg">
      <div className="social-header">
        <h2>Únete a nuestra <span>Comunidad</span></h2>
        <p>Síguenos en redes sociales para conocer los últimos lanzamientos, contenido exclusivo y formar parte de la familia D'JAVI ESPORT. ¡Comparte tus logros con #DJAVIESPORT!</p>
      </div>

      <div className="social-cards-grid">
        {socialLinks.map((social) => (
          <a href={social.url} key={social.name} className="social-card" target="_blank" rel="noopener noreferrer">
            {/* 3. Renderiza el componente del icono directamente. Lo envolvemos en un div para aplicar estilos. */}
            <div className="social-icon-wrapper">{social.icon}</div>
            <h3>{social.name}</h3>
            <p>{social.handle}</p>
          </a>
        ))}
      </div>

      <div className="instagram-feed">
        <h3>Lo último en Instagram</h3>
        <div className="instagram-grid">
          {instagramFeedImages.map((imgUrl, index) => (
            <a href="#" className="instagram-photo" key={index}>
              <img src={imgUrl} alt={`Instagram post ${index + 1}`} />
              <div className="instagram-overlay">
                {/* También puedes usar el icono aquí si quieres */}
                <FaInstagram style={{ width: '40px', height: '40px' }} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;
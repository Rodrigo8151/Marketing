// src/components/Social.tsx

import './Social.css';

const socialLinks = [
  { name: 'Instagram', handle: '@djaviesport', url: '#', iconUrl: '/icons/instagram.svg' },
  { name: 'Twitter', handle: '@djaviesport', url: '#', iconUrl: '/icons/twitter.svg' },
  { name: 'Facebook', handle: 'D\'JAVI ESPORT', url: '#', iconUrl: '/icons/facebook.svg' },
  { name: 'TikTok', handle: '@djaviesport', url: '#', iconUrl: '/icons/tiktok.svg' }, // Ejemplo, necesitarías el icono
  { name: 'YouTube', handle: 'D\'JAVI ESPORT TV', url: '#', iconUrl: '/icons/youtube.svg' }, // Ejemplo
];

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
            <img src={social.iconUrl} alt={`${social.name} icon`} className="social-icon" />
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
                <img src="/icons/instagram.svg" alt="Instagram Icon" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;
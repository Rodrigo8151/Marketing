import { FaTiktok, FaInstagram } from 'react-icons/fa';
import './Testimonios.css';

// --- CONTENIDO AMPLIADO Y MÁS REALISTA ---
const mockTestimonials = [
  { 
    name: 'Ana Sofía R.', 
    quote: '¡Increíble la atención en la tienda de Quillabamba! Me guiaron con paciencia hasta encontrar las zapatillas perfectas para mis maratones. ¡Totalmente recomendados!', 
    stars: 5, 
    // Imágenes genéricas de avatares. El número al final genera una cara diferente.
    imageUrl: 'https://i.pravatar.cc/150?img=1' 
  },
  { 
    name: 'Carlos Mendoza', 
    quote: 'La calidad es insuperable. Compré online desde Arequipa y el envío fue rapidísimo, en menos de 48 horas. Ya son mi tienda de confianza para todo mi equipo.', 
    stars: 5, 
    imageUrl: 'https://i.pravatar.cc/150?img=3' 
  },
  {
    name: 'Luciana Vargas',
    quote: 'El análisis de pisada que ofrecen es muy profesional. Gracias a su recomendación, mis dolores de rodilla al correr desaparecieron. ¡La mejor inversión!',
    stars: 5,
    imageUrl: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'Javier Quispe',
    quote: 'Encontré el modelo exacto que buscaba y que estaba agotado en todos lados. Tienen una variedad excelente y precios justos. Valoro mucho que traigan lo último.',
    stars: 5,
    imageUrl: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Mariana Torres',
    quote: 'Compré un regalo para mi esposo y fueron súper amables. Me asesoraron por WhatsApp y el paquete llegó impecable y a tiempo para su cumpleaños. ¡Mil gracias!',
    stars: 5,
    imageUrl: 'https://i.pravatar.cc/150?img=25'
  },
  {
    name: 'Miguel Ángel B.',
    quote: 'Como principiante, me sentía perdido. El equipo de D\'JAVI me hizo sentir cómodo, me explicaron todo sin tecnicismos y salí con el par ideal para empezar.',
    stars: 5,
    imageUrl: 'https://i.pravatar.cc/150?img=32'
  },
];

const TestimoniosPage = () => (
  <div className="testimonios-page-container">
    <div className="testimonios-header">
      <h2>Lo que dicen nuestros <span>Clientes</span></h2>
      <p>La confianza de nuestra comunidad es nuestro mayor logro. Aquí algunas de sus experiencias reales.</p>
    </div>

    <div className="testimonios-grid">
      {mockTestimonials.map((testimonio) => (
        <div className="testimonio-card" key={testimonio.name}>
          <img src={testimonio.imageUrl} alt={`Cliente satisfecho - ${testimonio.name}`} />
          <h4>{testimonio.name}</h4>
          <p>"{testimonio.quote}"</p>
          <div className="stars">{'★'.repeat(testimonio.stars)}</div>
        </div>
      ))}
    </div>
    
    <div className="review-cta-section">
      <h3>¿Tú también tuviste una buena experiencia?</h3>
      <p>Tu opinión es vital y ayuda a otros a tomar la mejor decisión. ¡Déjanos una reseña en nuestras redes!</p>
      <div className="review-buttons-container">
        {/* --- ENLACES REALES IMPLEMENTADOS --- */}
        <a href="https://www.tiktok.com/@d.javie.esport?_t=ZS-8zYsFwYfsWY&_r=1" className="review-btn" target="_blank" rel="noopener noreferrer">
          <FaTiktok size={20} />
          <span>Opina en TikTok</span>
        </a>
        <a href="https://www.instagram.com/djavieesport?igsh=MWZjNDFtbXB5NnFmMQ==" className="review-btn" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={20} />
          <span>Opina en Instagram</span>
        </a>
      </div>
    </div>
  </div>
);

export default TestimoniosPage;
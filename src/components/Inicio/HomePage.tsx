import React, { useState, useEffect, useRef } from 'react'; // Se importa React
import { Link } from 'react-router-dom';
import './HomePage.css';
import { ArrowLeft, ArrowRight, X } from 'react-feather';

// --- FUNCIÓN AUXILIAR PARA NETLIFY (puede estar fuera del componente) ---
const encode = (data: { [key: string]: string }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

// --- SECCIÓN DEL BANNER Y MODAL DEL CLUB (ACTUALIZADA CON LÓGICA DE NETLIFY) ---
const ClubBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  
  // Nuevos estados para manejar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Retrasamos el reseteo para que no se vea el cambio durante la animación de cierre
    setTimeout(() => {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setSubmitMessage('');
      setEmail('');
    }, 300);
  };

  // Lógica de envío a Netlify
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Enviamos los datos en segundo plano a Netlify
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "club-signup", // Este nombre DEBE coincidir con el del <form>
          "email": email
        })
      });

      // Si el envío es exitoso, mostramos la pantalla de éxito
      setIsSubmitted(true);

    } catch (error) {
      console.error("Error al enviar el formulario a Netlify:", error);
      setSubmitMessage("Hubo un error al registrarte. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="club-banner">
        <div className="banner-content">
          <span>ÚNETE AL CLUB Y OBTÉN UN 15% DE DESCUENTO</span>
          <button onClick={handleOpenModal}>
            REGÍSTRATE GRATIS <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              <X size={24} />
            </button>
            
            {!isSubmitted ? (
              <>
                <div className="modal-header">
                  <h3>INICIA SESIÓN O REGÍSTRATE.</h3>
                  <p>Accede a diseños exclusivos, experiencias, ofertas... ¡Y mucho más!</p>
                </div>
                {/* 
                  FORMULARIO ADAPTADO PARA NETLIFY:
                  1. 'name' del formulario.
                  2. 'data-netlify="true"' y 'data-netlify-honeypot'.
                  3. Campos ocultos necesarios para Netlify.
                  4. Atributo 'name' en el input de email.
                */}
                <form 
                  name="club-signup" 
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="modal-form"
                >
                  {/* Campos ocultos para Netlify */}
                  <input type="hidden" name="form-name" value="club-signup" />
                  <p hidden><label>No llenar: <input name="bot-field" /></label></p>

                  <div className="social-login-icons">
                    <button type="button" aria-label="Login con Apple"></button>
                    <button type="button" aria-label="Login con Facebook">f</button>
                    <button type="button" aria-label="Login con Google">G</button>
                  </div>
                  <input
                    type="email"
                    name="email" // <-- ATRIBUTO 'name' AÑADIDO (CRUCIAL)
                    placeholder="CORREO ELECTRÓNICO *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting} // Deshabilitado mientras se envía
                  />
                  <p className="privacy-notice">
                    ¡Nunca te pierdas nada gracias a los anuncios personalizados en los medios digitales!
                  </p>
                  <button type="submit" className="submit-arrow-btn" disabled={isSubmitting}>
                    {isSubmitting ? "..." : <ArrowRight size={24} />}
                  </button>
                  {/* Mensaje de error si lo hubiera */}
                  {submitMessage && <p className="error-message">{submitMessage}</p>}
                </form>
              </>
            ) : (
              <div className="success-message">
                <h3>¡Registro Exitoso!</h3>
                <p>Tu cupón de descuento ha sido enviado a tu correo electrónico.</p>
                <p><strong>{email}</strong></p>
                <button onClick={handleCloseModal} className="btn-success-close">Cerrar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// --- SECCIONES QUE PERMANECEN EN LA PÁGINA DE INICIO (SIN CAMBIOS) ---

// SECCIÓN 1: HERO
const heroProductsData = [
    { id: 1, name: 'ZAPATILLAS<br />QUE TE<br />LLEVAN<br />MÁS<br />LEJOS', subtitle: 'RENDIMIENTO Y ESTILO SUPERIOR', description: 'Descubre zapatillas que combinan comodidad, diseño y resistencia para acompañarte en cada momento.', variants: [{ id: 101, imageUrl: '/portfolio/p1.jpg' }, { id: 102, imageUrl: '/products/variant1.jpg' }, { id: 103, imageUrl: '/portfolio/p2.jpg' }] },
    { id: 2, name: 'ELIGE<br />TU<br />LEGADO', subtitle: 'LA SELECCIÓN D\'JAVI ESPORT', description: 'Cada par es una promesa de calidad y diseño. Equípate con lo mejor para dejar tu huella.', variants: [{ id: 201, imageUrl: '/portfolio/p4.jpg' }, { id: 202, imageUrl: '/products/variant2.jpg' }] }
];
const AUTOPLAY_DELAY = 5000;
const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [variantIndex, setVariantIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startAutoplay = () => { if (intervalRef.current !== null) return; intervalRef.current = window.setInterval(() => { setSlideIndex(prev => (prev + 1) % heroProductsData.length); setVariantIndex(0); }, AUTOPLAY_DELAY); };
  const stopAutoplay = () => { if (intervalRef.current !== null) { clearInterval(intervalRef.current); intervalRef.current = null; } };
  useEffect(() => { startAutoplay(); return () => stopAutoplay(); }, []);
  const triggerAnimation = (callback: () => void) => { setIsAnimating(true); setTimeout(() => { callback(); setIsAnimating(false); }, 300); };
  const goToSlide = (index: number) => { stopAutoplay(); if (index === slideIndex) return; triggerAnimation(() => { setSlideIndex(index); setVariantIndex(0); }); };
  const handleVariantSelect = (vIndex: number) => { stopAutoplay(); if (vIndex === variantIndex) return; triggerAnimation(() => { setVariantIndex(vIndex); }); };
  return (
    <section id="home" className="hero-container" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
      <div className="slides-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>{heroProductsData.map((product, pIndex) => (<div className="slide" key={product.id}><div className="color-variants-panel">{product.variants.map((variant, vIndex) => (<div className={`variant-selector ${pIndex === slideIndex && vIndex === variantIndex ? 'active' : ''}`} key={variant.id} onClick={() => handleVariantSelect(vIndex)}><img src={variant.imageUrl} alt={`Variant ${vIndex + 1}`} /></div>))}</div><div className="product-display-area"><div className="background-shapes"><div className="shape shape1"></div><div className="shape shape2"></div></div><img src={product.variants[pIndex === slideIndex ? variantIndex : 0].imageUrl} alt={product.name.replace(/<br \/>/g, ' ')} className={`main-product-image ${isAnimating ? 'animating' : ''}`} /></div><div className="info-panel"><div className="info-content"><h1 dangerouslySetInnerHTML={{ __html: product.name }} /><h2>{product.subtitle}</h2><p>{product.description}</p><Link to="/productos?categoria=nuevo" className="buy-now-btn">BUY NOW</Link></div></div></div>))}</div>
      <div className="slider-dots-nav">{heroProductsData.map((_, index) => (<button key={index} className={`nav-dot ${slideIndex === index ? 'active' : ''}`} onClick={() => goToSlide(index)}></button>))}</div>
    </section>
  );
};


// SECCIÓN 2: ABOUT (CARRUSEL DE PRODUCTOS DESTACADOS)
const featuredProducts = [
  { id: 1, brand: "Ronnie Fieg x Puma", name: "R698 Mid - Sakura", description: "Inspirado en las flores de cerezo japonesas.", price: 220, imageUrl: "/portfolio/p1.jpg", color: "#E5528A" }, { id: 2, brand: "Nike", name: "Air Max 90 Infrared", description: "Uno de los modelos más icónicos de la historia.", price: 129, imageUrl: "/portfolio/p2.jpg", color: "#E63946" }, { id: 3, brand: "Adidas", name: "Yeezy Boosts 350", description: "Presenta una parte superior de Primeknit tonal.", price: 199, imageUrl: "/portfolio/p3.jpg", color: "#2D3A3A" }, { id: 4, brand: "D'JAVI SPORT", name: "Apex Runner", description: "Nuestro diseño insignia, listo para cualquier desafío.", price: 180, imageUrl: "/portfolio/p4.jpg", color: "#457B9D" }
];
const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const goToNext = () => setActiveIndex((prev) => (prev + 1) % featuredProducts.length);
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  const trackStyle = { transform: `translateX(calc(50% - ${activeIndex * 400}px - 200px))` };
  return (
    <section id="products" className="featured-container"><div className="carousel-wrapper"><div className="carousel-track" style={trackStyle}>{featuredProducts.map((product, index) => (<div className={`product-slide ${index === activeIndex ? 'active' : ''}`} key={product.id}><div className="product-card"><div className="card-top" style={{ backgroundColor: product.color }}><img src={product.imageUrl} alt={product.name} className="product-image" /></div><div className="card-bottom"><span className="product-brand">{product.brand}</span><h3>{product.name}</h3><p>{product.description}</p><div className="price-button" style={{ backgroundColor: product.color }}><span>${product.price}</span><div className="divider-line"></div><button>ADD TO CART</button></div></div></div></div>))}</div></div><div className="carousel-navigation"><button onClick={goToPrev} className="nav-arrow"><ArrowLeft /></button><div className="carousel-dots">{featuredProducts.map((_, index) => (<div key={index} className={`dot ${index === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(index)}></div>))}</div><button onClick={goToNext} className="nav-arrow"><ArrowRight /></button></div></section>
  );
};


// SECCIÓN 3: PORTFOLIO (NUESTRA COLECCIÓN)
const productItems = [
  { id: 1, name: 'Apex Runner Pro', category: 'Running', price: '$159.99', imageUrl: './portfolio/p1.jpg' }, { id: 2, name: 'Urban Stride', category: 'Urbano', price: '$129.99', imageUrl: '/portfolio/p2.jpg' }, { id: 3, name: 'Trail Blazer XT', category: 'Outdoor', price: '$199.99', imageUrl: '/portfolio/p3.jpg' }, { id: 4, name: 'Gym Flex 360', category: 'Training', price: '$139.99', imageUrl: '/portfolio/p4.jpg' }, { id: 5, name: 'Mountain Peak Hiker', category: 'Outdoor', price: '$249.99', imageUrl: '/portfolio/p5.jpg' }, { id: 6, name: 'Street Classic', category: 'Urbano', price: '$99.99', imageUrl: '/portfolio/p6.jpg' }, { id: 7, name: 'Velocity Racer', category: 'Running', price: '$175.00', imageUrl: '/portfolio/p7.jpg' }, { id: 8, name: 'Power Lift XT', category: 'Training', price: '$149.99', imageUrl: '/portfolio/p8.jpg' },
];
const categories = ['All', 'Running', 'Urbano', 'Training', 'Outdoor'];
const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filteredItems = activeFilter === 'All' ? productItems : productItems.filter(item => item.category === activeFilter);
  return (
    <section id="portfolio" className="portfolio-container"><div className="portfolio-header"><h2>Nuestra <span>Colección</span></h2><p>Explora nuestra selección de zapatillas de alto rendimiento. Diseñadas para cada disciplina, construidas para durar.</p></div><div className="portfolio-filters">{categories.map(category => (<button key={category} className={activeFilter === category ? 'active' : ''} onClick={() => setActiveFilter(category)}>{category}</button>))}</div><div className="portfolio-grid">{filteredItems.map(item => (<div className="portfolio-item" key={item.id}><img src={item.imageUrl} alt={item.name} /><div className="portfolio-overlay"><h3>{item.name}</h3><p>{item.category}</p><span>{item.price}</span></div></div>))}</div></section>
  );
};


// --- COMPONENTE PRINCIPAL DE LA PÁGINA (EXPORTACIÓN POR DEFECTO) ---
const HomePage = () => {
  return (
    <>
      <Hero />
      <div className="banner-about-wrapper">
        <ClubBanner />
        <About />
      </div>
      <Portfolio />
    </>
  );
};

export default HomePage;
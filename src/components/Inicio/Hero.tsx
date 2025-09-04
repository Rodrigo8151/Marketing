// src/components/Hero.tsx

import { useState, useEffect, useRef } from 'react';
import './Hero.css';

// --- TÍTULOS MODIFICADOS CON <br /> PARA UN MEJOR AJUSTE VISUAL ---
const productsData = [
  { 
    id: 1, 
    name: 'ZAPATILLAS<br />QUE TE<br />LLEVAN<br />MÁS<br />LEJOS', 
    subtitle: 'RENDIMIENTO Y ESTILO SUPERIOR', 
    description: 'Descubre zapatillas que combinan comodidad, diseño y resistencia para acompañarte en cada momento de tu día, desde la calle hasta el deporte.', 
    variants: [ 
      { id: 101, imageUrl: '/portfolio/p1.jpg' }, 
      { id: 102, imageUrl: '/products/variant1.jpg' }, 
      { id: 103, imageUrl: '/portfolio/p2.jpg' } 
    ] 
  },
  { 
    id: 2, 
    name: 'ELIGE<br />TU<br />LEGADO', // Mismo estilo de título para consistencia
    subtitle: 'LA SELECCIÓN D\'JAVI ESPORT', 
    description: 'Cada par es una promesa de calidad y diseño. Equípate con lo mejor y prepárate para dejar tu huella en cada cancha y cada calle.', 
    variants: [ 
      { id: 201, imageUrl: '/portfolio/p4.jpg' }, 
      { id: 202, imageUrl: '/products/variant2.jpg' } 
    ] 
  }
];

const AUTOPLAY_DELAY = 5000;

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [variantIndex, setVariantIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startAutoplay = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      setSlideIndex(prev => (prev + 1) % productsData.length);
      setVariantIndex(0);
    }, AUTOPLAY_DELAY);
  };

  const stopAutoplay = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const triggerAnimation = (callback: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    stopAutoplay();
    if (index === slideIndex) return;
    triggerAnimation(() => {
      setSlideIndex(index);
      setVariantIndex(0);
    });
  };

  const handleVariantSelect = (vIndex: number) => {
    stopAutoplay();
    if (vIndex === variantIndex) return;
    triggerAnimation(() => {
      setVariantIndex(vIndex);
    });
  };

  return (
    <section 
      id="home" 
      className="hero-container"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="slides-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
        {productsData.map((product, pIndex) => (
          <div className="slide" key={product.id}>
            <div className="color-variants-panel">
              {product.variants.map((variant, vIndex) => (
                <div 
                  className={`variant-selector ${pIndex === slideIndex && vIndex === variantIndex ? 'active' : ''}`}
                  key={variant.id}
                  onClick={() => handleVariantSelect(vIndex)}
                >
                  <img src={variant.imageUrl} alt={`Variant ${vIndex + 1}`} />
                </div>
              ))}
            </div>

            <div className="product-display-area">
              <div className="background-shapes">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
              </div>
              <img 
                src={product.variants[pIndex === slideIndex ? variantIndex : 0].imageUrl} 
                alt={product.name.replace(/<br \/>/g, ' ')} 
                className={`main-product-image ${isAnimating ? 'animating' : ''}`}
              />
            </div>
            
            <div className="info-panel">
              <div className="info-content">
                {/* CAMBIO CLAVE: Usamos dangerouslySetInnerHTML para renderizar las etiquetas <br /> */}
                <h1 dangerouslySetInnerHTML={{ __html: product.name }} />
                <h2>{product.subtitle}</h2>
                <p>{product.description}</p>
                <a href="/productos?categoria=nuevo" className="buy-now-btn">BUY NOW</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-dots-nav">
        {productsData.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${slideIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;//nuevo
// src/components/Hero.tsx

import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const productsData = [
  { id: 1, name: 'PROPHERE', subtitle: 'FUTURISTIC SNEAKERS', description: 'Agresivo, llamativo y nunca se disculpa. Prophere revela el futuro un paso a la vez.', variants: [ { id: 101, imageUrl: '/portfolio/p1.jpg' }, { id: 102, imageUrl: '/products/variant1.jpg' }, { id: 103, imageUrl: '/portfolio/p2.jpg' } ] },
  { id: 2, name: 'ULTRABOOST', subtitle: 'ENERGY RUNNING', description: 'Siente la energía en cada zancada. El retorno de energía de Boost te mantiene en movimiento.', variants: [ { id: 201, imageUrl: '/portfolio/p4.jpg' }, { id: 202, imageUrl: '/products/variant2.jpg' } ] }
];

const AUTOPLAY_DELAY = 5000;

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [variantIndex, setVariantIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // <--- NUEVO ESTADO PARA ANIMACIÓN
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
      callback(); // Ejecuta el cambio de estado (slide o variante)
      setIsAnimating(false);
    }, 300); // Duración de la animación de fade-out
  };

  const goToSlide = (index: number) => {
    stopAutoplay();
    if (index === slideIndex) return; // No hacer nada si ya está en el slide
    triggerAnimation(() => {
      setSlideIndex(index);
      setVariantIndex(0);
    });
  };

  const handleVariantSelect = (vIndex: number) => {
    stopAutoplay();
    if (vIndex === variantIndex) return; // No hacer nada si ya está en la variante
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
                alt={product.name} 
                // AÑADIMOS LA CLASE DE ANIMACIÓN
                className={`main-product-image ${isAnimating ? 'animating' : ''}`}
              />
            </div>
            
            <div className="info-panel">
              <div className="info-content">
                <h1>{product.name}</h1>
                <h2>{product.subtitle}</h2>
                <p>{product.description}</p>
                <a href="#" className="buy-now-btn">BUY NOW</a>
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

export default Hero;
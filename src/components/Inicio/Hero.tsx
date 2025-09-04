// src/components/Hero.tsx

import { useState } from "react";
import "./Hero.css";

const productVariants = [
  { id: 1, img: "/images/product-red.png", alt: "Producto Rojo" },
  { id: 2, img: "/images/product-blue.png", alt: "Producto Azul" },
  { id: 3, img: "/images/product-yellow.png", alt: "Producto Amarillo" },
];

const slides = [
  {
    title: "Nueva Colección",
    subtitle: "Rendimiento y estilo",
    description:
      "Descubre la última línea de productos diseñada para atletas que buscan lo mejor en comodidad y diseño.",
    cta: "Comprar ahora",
  },
  {
    title: "Tecnología Avanzada",
    subtitle: "Innovación en cada detalle",
    description:
      "Cada modelo incorpora materiales de alta calidad para ofrecerte una experiencia única.",
    cta: "Explorar más",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(productVariants[0]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-container">
      <div
        className="slides-wrapper"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            {/* Área de producto */}
            <div className="product-display-area">
              <img
                src={selectedVariant.img}
                alt={selectedVariant.alt}
                className="main-product-image"
              />
              <div className="color-variants-panel">
                {productVariants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`variant-selector ${
                      selectedVariant.id === variant.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    <img src={variant.img} alt={variant.alt} />
                  </button>
                ))}
              </div>
            </div>

            {/* Área de información */}
            <div className="info-panel">
              <div className="info-content">
                <h2>{slide.subtitle}</h2>
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <a href="#" className="buy-now-btn">
                  {slide.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots de navegación */}
      <div className="slider-dots-nav">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

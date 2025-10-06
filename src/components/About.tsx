// src/components/About.tsx

import { useState } from 'react';
import './About.css';
import { ArrowLeft, ArrowRight } from 'react-feather';

// Los datos de tus productos
const products = [
  { id: 1, brand: "Ronnie Fieg x Puma", name: "R698 Mid - Sakura", description: "Inspirado en las flores de cerezo japonesas.", price: 220, imageUrl: "/portfolio/p1.jpg", color: "#E5528A" },
  { id: 2, brand: "Nike", name: "Air Max 90 Infrared", description: "Sin duda uno de los modelos más icónicos de la historia.", price: 129, imageUrl: "/portfolio/p2.jpg", color: "#E63946" },
  { id: 3, brand: "Adidas", name: "Yeezy Boosts 350", description: "Presenta una parte superior compuesta de Primeknit tonal.", price: 199, imageUrl: "/portfolio/p3.jpg", color: "#2D3A3A" },
  { id: 4, brand: "D'JAVI SPORT", name: "Apex Runner", description: "Nuestro diseño insignia, listo arpa cualquier desafío.", price: 180, imageUrl: "/portfolio/p4.jpg", color: "#457B9D" }
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const goToPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <section id="products" className="featured-container">
      <div className="background-split"></div>

      <div className="carousel-wrapper">
        <div className="carousel-track">
          {products.map((product, index) => (
            <div className={`product-slide ${index === activeIndex ? 'active' : ''}`} key={product.id}>
              <div className="product-card">
                <div className="card-top" style={{ backgroundColor: product.color }}>
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                </div>
                <div className="card-bottom">
                  <span className="product-brand">{product.brand}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="price-button" style={{ backgroundColor: product.color }}>
                    <span>${product.price}</span>
                    <div className="divider-line"></div>
                    <button>ADD TO CART</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-navigation">
        <button onClick={goToPrev} className="nav-arrow"><ArrowLeft /></button>
        <div className="carousel-dots">
          {products.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </div>
        <button onClick={goToNext} className="nav-arrow"><ArrowRight /></button>
      </div>
    </section>
  );
};

export default About;

// src/components/Portfolio.tsx

import { useState } from 'react';
import './Portfolio.css';

interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
}

const productItems: ProductItem[] = [
  { id: 1, name: 'Apex Runner Pro', category: 'Running', price: '$159.99', imageUrl: './portfolio/p1.jpg' },
  { id: 2, name: 'Urban Stride', category: 'Urbano', price: '$129.99', imageUrl: '/portfolio/p2.jpg' },
  { id: 3, name: 'Trail Blazer XT', category: 'Outdoor', price: '$199.99', imageUrl: '/portfolio/p3.jpg' },
  { id: 4, name: 'Gym Flex 360', category: 'Training', price: '$139.99', imageUrl: '/portfolio/p4.jpg' },
  { id: 5, name: 'Mountain Peak Hiker', category: 'Outdoor', price: '$249.99', imageUrl: '/portfolio/p5.jpg' },
  { id: 6, name: 'Street Classic', category: 'Urbano', price: '$99.99', imageUrl: '/portfolio/p6.jpg' },
  { id: 7, name: 'Velocity Racer', category: 'Running', price: '$175.00', imageUrl: '/portfolio/p7.jpg' },
  { id: 8, name: 'Power Lift XT', category: 'Training', price: '$149.99', imageUrl: '/portfolio/p8.jpg' },
];

const categories = ['All', 'Running', 'Urbano', 'Training', 'Outdoor'];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All'
    ? productItems
    : productItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="portfolio-container">
      <div className="portfolio-header">
        <h2>Nuestra <span>Colección</span></h2>
        <p>Explora nuestra selección de zapatillas de alto rendimiento. Diseñadas para cada disciplina, construidas para durar.</p>
      </div>

      <div className="portfolio-filters">
        {categories.map(category => (
          <button
            key={category}
            className={activeFilter === category ? 'active' : ''}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {filteredItems.map(item => (
          <div className="portfolio-item" key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <div className="portfolio-overlay">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <span>{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
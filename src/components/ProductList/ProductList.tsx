import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'react-feather';
import './ProductList.css';

// --- INTERFACES Y DATOS DE PRODUCTOS (SIN CAMBIOS) ---
interface Product {
    id: number;
    name: string;
    type: string;
    brand: string;
    gender: 'Hombre' | 'Mujer' | 'Unisex';
    sizes: number[];
    color: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
}
  
const allProducts: Product[] = [
    { id: 9, name: 'Zapatillas Lotto Edición Limitada', type: 'Urbano', brand: 'Lotto', gender: 'Hombre', sizes: [40, 42, 44], color: 'Negro', price: 99.90, originalPrice: 269.90, imageUrl: '/portfolio/p1.jpg' },
    { id: 1, name: 'Zapatillas Urbanas StyleMax', type: 'Urbano', brand: 'Nike', gender: 'Hombre', sizes: [40, 41, 42, 43], color: 'Negro', price: 199.90, originalPrice: 299.90, imageUrl: '/products/variant1.jpg' },
    { id: 2, name: 'Zapatillas de Trekking Pro', type: 'Trekking', brand: 'Caterpillar', gender: 'Hombre', sizes: [42, 43, 44], color: 'Azul', price: 271.00, originalPrice: 469.90, imageUrl: '/portfolio/p5.jpg' },
    { id: 3, name: 'Zapatillas de Running AirFlex', type: 'Running', brand: 'Adidas', gender: 'Mujer', sizes: [36, 37, 38], color: 'Rosado', price: 220.00, originalPrice: 350.00, imageUrl: '/portfolio/p7.jpg' },
    { id: 4, name: 'Zapatillas Clásicas Retro', type: 'Urbano', brand: 'Puma', gender: 'Unisex', sizes: [38, 39, 40, 41], color: 'Blanco', price: 180.00, imageUrl: '/portfolio/p8.jpg' },
    { id: 5, name: 'Zapatillas de Montaña Explorer', type: 'Trekking', brand: 'Hi-Tec', gender: 'Hombre', sizes: [41, 42, 44], color: 'Marrón', price: 310.00, originalPrice: 500.00, imageUrl: '/portfolio/p4.jpg' },
];

const productTypes = [...new Set(allProducts.map(p => p.type))];
const brands = [...new Set(allProducts.map(p => p.brand))];
const genders = [...new Set(allProducts.map(p => p.gender))];

// --- FUNCIÓN AUXILIAR PARA NETLIFY ---
const encode = (data: { [key: string]: string }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

// --- COMPONENTE BANNER ACTUALIZADO CON LÓGICA DE NETLIFY ---
const ClubBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  
  // Estados para manejar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "club-signup", // Mismo nombre que en HomePage para agrupar envíos
          "email": email
        })
      });
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
                <form 
                  name="club-signup" 
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="modal-form"
                >
                  <input type="hidden" name="form-name" value="club-signup" />
                  <p hidden><label>No llenar: <input name="bot-field" /></label></p>
                  <div className="social-login-icons">
                    <button type="button" aria-label="Login con Apple"></button>
                    <button type="button" aria-label="Login con Facebook">f</button>
                    <button type="button" aria-label="Login con Google">G</button>
                  </div>
                  <input
                    type="email"
                    name="email" // Atributo name es crucial
                    placeholder="CORREO ELECTRÓNICO *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  <p className="privacy-notice">
                    ¡Nunca te pierdas nada gracias a los anuncios personalizados en los medios digitales!
                  </p>
                  <button type="submit" className="submit-arrow-btn" disabled={isSubmitting}>
                    {isSubmitting ? "..." : <ArrowRight size={24} />}
                  </button>
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

// --- COMPONENTE ACORDEÓN PARA FILTROS (SIN CAMBIOS) ---
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}
const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => (
  <div className={`filter-group ${isOpen ? 'open' : ''}`}>
    <button className="filter-group-header" onClick={onToggle}>
      <span className="filter-group-title">{title}</span>
      <span className="filter-group-toggle">{isOpen ? '−' : '+'}</span>
    </button>
    <div className="filter-group-content">{children}</div>
  </div>
);

// --- COMPONENTE PRINCIPAL DE LA PÁGINA (SIN CAMBIOS) ---
const ProductList: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [openAccordion, setOpenAccordion] = useState<string | null>('TIPO DE PRODUCTO');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    let products = [...allProducts];
    if (selectedTypes.length > 0) { products = products.filter(p => selectedTypes.includes(p.type)); }
    if (selectedBrands.length > 0) { products = products.filter(p => selectedBrands.includes(p.brand)); }
    if (selectedGenders.length > 0) { products = products.filter(p => selectedGenders.includes(p.gender)); }
    setFilteredProducts(products);
  }, [selectedTypes, selectedBrands, selectedGenders]);

  const handleToggleAccordion = (title: string) => {
    setOpenAccordion(prev => (prev === title ? null : title));
  };
  
  const handleFilterChange = (value: string, filterType: 'type' | 'brand' | 'gender') => {
      const setters = { type: setSelectedTypes, brand: setSelectedBrands, gender: setSelectedGenders };
      setters[filterType](prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  return (
    <div className="shop-page">
      <div 
        className={`filters-overlay ${isFiltersOpen ? 'is-open' : ''}`}
        onClick={() => setIsFiltersOpen(false)}
      ></div>
      
      <ClubBanner />

      <div className="shop-container">
        <aside className={`filters-sidebar ${isFiltersOpen ? 'is-open' : ''}`}>
            <div className="filters-sidebar-header">
              <h2 className="filters-title">OFERTAS</h2>
              <button className="close-filters-btn" onClick={() => setIsFiltersOpen(false)}>&times;</button>
            </div>
            <AccordionItem title="TIPO DE PRODUCTO" isOpen={openAccordion === 'TIPO DE PRODUCTO'} onToggle={() => handleToggleAccordion('TIPO DE PRODUCTO')}>
                {productTypes.map(type => (<label key={type}><input type="checkbox" onChange={() => handleFilterChange(type, 'type')} /> {type}</label>))}
            </AccordionItem>
            <AccordionItem title="MARCA" isOpen={openAccordion === 'MARCA'} onToggle={() => handleToggleAccordion('MARCA')}>
              {brands.map(brand => (<label key={brand}><input type="checkbox" onChange={() => handleFilterChange(brand, 'brand')} /> {brand}</label>))}
            </AccordionItem>
            <AccordionItem title="GÉNERO" isOpen={openAccordion === 'GÉNERO'} onToggle={() => handleToggleAccordion('GÉNERO')}>
                {genders.map(gender => (<label key={gender}><input type="checkbox" onChange={() => handleFilterChange(gender, 'gender')} /> {gender}</label>))}
            </AccordionItem>
        </aside>

        <main className="product-display">
          <div className="product-display-header">
            <div className="header-left">
              <button className="filter-toggle-btn" onClick={() => setIsFiltersOpen(true)}>FILTROS</button>
              <span>{filteredProducts.length} PRODUCTOS</span>
            </div>
            <select className="sort-dropdown"><option value="default">Ordenar</option></select>
          </div>
          
          <div className="product-grid">
            {filteredProducts.map(product => (
              <Link to={`/producto/${product.id}`} key={product.id} className="product-card-link">
                <div className="product-card">
                  <div className="product-image-container">
                    {product.originalPrice && <div className="discount-badge">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</div>}
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                  </div>
                  <div className="product-details">
                    <p className="product-category">{product.brand.toUpperCase()}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-price-container">
                      <span className="sale-price">S/ {product.price.toFixed(2)}</span>
                      {product.originalPrice && <span className="original-price">S/ {product.originalPrice.toFixed(2)}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductList;
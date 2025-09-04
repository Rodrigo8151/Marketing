import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ProductDetail.css';

// --- DATOS DE EJEMPLO ---
const allProducts = [
    { id: 9, name: 'Zapatillas Lotto Edición Limitada', type: 'Urbano', brand: 'Lotto', gender: 'Hombre', sizes: [40, 41, 42, 43, 44], color: 'Negro', price: 99.90, originalPrice: 269.90, description: 'Un diseño exclusivo que combina comodidad y estilo urbano, perfecto para destacar en la ciudad.', imageUrls: ['/products/variant1.jpg', '/products/variant2.jpg', '/products/variant3.jpg', '/products/variant4.jpg'], reviews: [{id: 1, author: 'Juan P.', rating: 5, comment: '¡Excelentes! Muy cómodas y el diseño es genial.'}] },
    { id: 1, name: 'Zapatillas Urbanas StyleMax', type: 'Urbano', brand: 'Nike', gender: 'Hombre', sizes: [40, 41, 42, 43], color: 'Negro', price: 199.90, originalPrice: 299.90, description: 'Perfectas para el día a día, con la calidad y el confort que solo Nike puede ofrecer.', imageUrls: ['/products/variant2.jpg', '/products/variant3.jpg', '/products/variant4.jpg', '/products/variant5.jpg'], reviews: [{id: 2, author: 'Maria G.', rating: 4, comment: 'Muy bonitas, aunque un poco justas al principio.'}, {id: 3, author: 'Carlos R.', rating: 5, comment: 'Calidad superior, valen cada centavo.'}] },
    { id: 2, name: 'Zapatillas de Trekking Pro', type: 'Trekking', brand: 'Caterpillar', gender: 'Hombre', sizes: [42, 43, 44], color: 'Azul', price: 271.00, originalPrice: 469.90, description: 'Diseñadas para la aventura, ofrecen un agarre y durabilidad excepcionales.', imageUrls: ['/products/variant3.jpg', '/products/variant4.jpg', '/products/variant5.jpg', '/products/variant6.jpg'], reviews: [] },
    { id: 3, name: 'Zapatillas Running AirFlex', type: 'Running', brand: 'Adidas', gender: 'Mujer', sizes: [37, 38, 39], color: 'Rosado', price: 250.00, originalPrice: 380.00, description: 'Ligeras y flexibles, ideales para corredoras.', imageUrls: ['/products/variant4.jpg', '/products/variant5.jpg', '/products/variant6.jpg', '/products/variant7.jpg'], reviews: [{id: 4, author: 'Ana F.', rating: 5, comment: '¡Las mejores zapatillas para correr que he tenido!'}] },
];

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const product = allProducts.find(p => p.id === Number(productId));

    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [suggestionsScrollIndex, setSuggestionsScrollIndex] = useState(0);

    if (!product) { return <div className="product-not-found">Producto no encontrado</div>; }

    const relatedProducts = allProducts.filter(p => p.id !== product.id);
    const maxScroll = Math.max(0, relatedProducts.length - 4); // Asumiendo 4 visibles

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => <FaStar key={i} color={i < rating ? '#ffc107' : '#e4e5e9'} />);
    };

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                {/* --- CARRUSEL DE IMÁGENES --- */}
                <div className="image-carousel">
                    <div className="main-image-container">
                        {/* Se usa `activeImageIndex` aquí */}
                        <img src={product.imageUrls[activeImageIndex]} alt={`${product.name} - vista ${activeImageIndex + 1}`} />
                    </div>
                    <div className="thumbnail-container">
                        {product.imageUrls.map((url, index) => (
                            <div
                                key={index}
                                // Y se usa `activeImageIndex` aquí también
                                className={`thumbnail-item ${index === activeImageIndex ? 'active' : ''}`}
                                onClick={() => setActiveImageIndex(index)}
                            >
                                <img src={url} alt={`miniatura ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- INFORMACIÓN DEL PRODUCTO --- */}
                <div className="product-info">
                     <h1 className="product-title">{product.name.toUpperCase()}</h1>
                    <div className="price-section">
                        <span className="current-price">S/ {product.price.toFixed(2)}</span>
                        {product.originalPrice && <span className="original-price-detail">S/ {product.originalPrice.toFixed(2)}</span>}
                        {product.originalPrice && <span className="discount-tag">-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>}
                    </div>
                    <p className="product-description">{product.description}</p>
                    <div className="size-selector">
                        <div className="size-header">
                            <span>Tallas</span>
                            <Link to="/guia-de-tallas" className="size-guide-link">Guía de tallas</Link>
                        </div>
                        <div className="size-grid">
                            {product.sizes.map(size => (
                                <button key={size} className={`size-option ${selectedSize === size ? 'selected' : ''}`} onClick={() => setSelectedSize(size)}>US {size}</button>
                            ))}
                        </div>
                    </div>
                    <button className="add-to-cart-button">Agregar al carrito</button>
                    <div className="fit-recommendation"><p>Te recomendamos pedir tu talla habitual.</p></div>
                </div>
            </div>

            {/* --- CARRUSEL DE SUGERENCIAS --- */}
            <div className="related-products">
                <h2 className="related-title">OTROS TAMBIÉN COMPRARON</h2>
                <div className="carousel-wrapper">
                    <button className="carousel-arrow left" onClick={() => setSuggestionsScrollIndex(s => Math.max(0, s - 1))} disabled={suggestionsScrollIndex === 0}><FaChevronLeft /></button>
                    <div className="carousel-container">
                        {/* Se usa `suggestionsScrollIndex` aquí */}
                        <div className="carousel-track" style={{ transform: `translateX(-${suggestionsScrollIndex * 25}%)` }}>
                            {relatedProducts.map(related => (
                                <Link to={`/producto/${related.id}`} key={related.id} className="related-product-card">
                                    <div className="related-image-container"><img src={related.imageUrls[0]} alt={related.name} /></div>
                                    <div className="related-details">
                                        <p className="related-name">{related.name}</p>
                                        <p className="related-price">S/ {related.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Se usa `maxScroll` y `suggestionsScrollIndex` aquí */}
                    <button className="carousel-arrow right" onClick={() => setSuggestionsScrollIndex(s => Math.min(maxScroll, s + 1))} disabled={suggestionsScrollIndex >= maxScroll}><FaChevronRight /></button>
                </div>
            </div>

            {/* --- SECCIÓN DE RESEÑAS --- */}
            <div className="reviews-section">
                <h2 className="reviews-title">RESEÑAS</h2>
                {product.reviews.length > 0 ? (
                    <div className="reviews-list">
                        {product.reviews.map(review => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    {/* Se usa `renderStars` aquí */}
                                    <div className="star-rating">{renderStars(review.rating)}</div>
                                    <span className="review-author">{review.author}</span>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : ( <p>Este producto aún no tiene reseñas.</p> )}
            </div>
        </div>
    );
};

export default ProductDetail;
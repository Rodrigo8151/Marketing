// src/App.tsx

// 1. Importa las herramientas de React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus componentes de la página de inicio
import Navbar from './components/Inicio/Navbar';
import Hero from './components/Inicio/Hero';
import About from './components/Inicio/About';
import Social from './components/Inicio/Social';
import Contact from './components/Inicio/Contact';
import MapSection from './components/Inicio/MapSection';
import Footer from './components/Inicio/Footer';

// Importa los componentes de las páginas de la tienda
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail'; 

// LA LÍNEA INCORRECTA "import './ProductDetail.css';" HA SIDO ELIMINADA DE AQUÍ

// Componentes sencillos para las otras rutas
const LoginPage = () => <div style={{padding: '100px 5%'}}><h1>Página de Login</h1></div>;
const CartPage = () => <div style={{padding: '100px 5%'}}><h1>Página del Carrito</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        
        {/* RUTA PARA LA PÁGINA DE INICIO ('/') */}
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Social />
            <Contact />
            <MapSection />
          </>
        } />

        {/* RUTA PARA LA TIENDA DE PRODUCTOS ('/productos') */}
        <Route path="/productos" element={<ProductList />} />
        
        {/* RUTA DINÁMICA PARA EL DETALLE DE PRODUCTO */}
        <Route path="/producto/:productId" element={<ProductDetail />} />
        
        {/* Rutas para los otros enlaces */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
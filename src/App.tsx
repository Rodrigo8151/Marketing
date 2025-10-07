import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes del Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas Principales
import HomePage from './components/Inicio/HomePage';
import NosotrosPage from './components/NosotrosPage';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';

// --- PÁGINAS DE MARKETING (CON IMPORTS ACTUALIZADOS) ---

// 1. Importamos BlogPostPage y LandingPageGuia desde el mismo archivo con llaves {}.
import { BlogPostPage, LandingPageGuia } from './components/INBOUND MARKETING/BlogPostPage'; 

// El resto de los imports se mantienen.
import BlogPage from './components/INBOUND MARKETING/BlogPage';
import LandingPageClub from './components/INBOUND MARKETING/LandingPageClub';
import TestimoniosPage from './components/INBOUND MARKETING/TestimoniosPage';
import ReferidosPage from './components/INBOUND MARKETING/ReferidosPage';


// Páginas de ejemplo
const LoginPage = () => <div style={{padding: '100px 5%'}}><h1>Página de Login</h1></div>;
const CartPage = () => <div style={{padding: '100px 5%'}}><h1>Página del Carrito</h1></div>;
const MarcasPage = () => <div style={{padding: '100px 5%'}}><h1>Página de Marcas</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          {/* Rutas existentes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/producto/:productId" element={<ProductDetail />} />

          {/* --- RUTAS DE MARKETING (ACTUALIZADAS PARA SER DINÁMICAS) --- */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />

          {/* 2. La ruta para la landing page ahora pasa un 'prop' para indicar qué contenido mostrar. */}
          <Route 
            path="/guia-cuidado-zapatillas" 
            element={<LandingPageGuia leadMagnetId="cuidado-zapatillas-running" />} 
          />

          {/* 3. Añadimos la nueva ruta para la segunda landing page (el checklist). */}
          <Route 
            path="/checklist-calzado-ideal" 
            element={<LandingPageGuia leadMagnetId="elegir-zapatilla-perfecta" />} 
          />
          
          <Route path="/club-vip" element={<LandingPageClub />} />
          <Route path="/testimonios" element={<TestimoniosPage />} />
          <Route path="/programa-referidos" element={<ReferidosPage />} />

          {/* Otras rutas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/marcas" element={<MarcasPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes del Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas Principales
import HomePage from './components/Inicio/HomePage';
import NosotrosPage from './components/NosotrosPage';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';

// --- PÁGINAS DE MARKETING (CON RUTAS CORREGIDAS A LA NUEVA CARPETA) ---
import BlogPage from './components/INBOUND MARKETING/BlogPage';          // -> CAMBIO AQUÍ
import BlogPostPage from './components/INBOUND MARKETING/BlogPostPage';  // -> CAMBIO AQUÍ
import LandingPageGuia from './components/INBOUND MARKETING/LandingPageGuia'; // -> CAMBIO AQUÍ (asumiendo que también está aquí)
import LandingPageClub from './components/INBOUND MARKETING/LandingPageClub'; // -> CAMBIO AQUÍ (asumiendo que también está aquí)
import TestimoniosPage from './components/INBOUND MARKETING/TestimoniosPage'; // -> CAMBIO AQUÍ (asumiendo que también está aquí)
import ReferidosPage from './components/INBOUND MARKETING/ReferidosPage';   // -> CAMBIO AQUÍ (asumiendo que también está aquí)


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

          {/* --- RUTAS DE MARKETING (SIN CAMBIOS, SOLO LOS IMPORTS ARRIBA) --- */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} /> {/* Corregido de :postId a :id para coincidir con el código de BlogPostPage */}
          <Route path="/guia-cuidado-zapatillas" element={<LandingPageGuia />} />
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
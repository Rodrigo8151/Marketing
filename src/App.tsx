// src/App.tsx

import Navbar from './components/Inicio/Navbar';
import Hero from './components/Inicio/Hero';
import About from './components/Inicio/About';
import Social from './components/Inicio/Social';
import Contact from './components/Inicio/Contact';
import MapSection from './components/Inicio/MapSection'; // 1. Importa MapSection
import Footer from './components/Inicio/Footer';       // 2. Importa Footer

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Social />
      <Contact />
      <MapSection /> {/* 3. Añádelo aquí */}
      <Footer />     {/* 4. Y el footer al final */}
    </div>
  );
}

export default App;
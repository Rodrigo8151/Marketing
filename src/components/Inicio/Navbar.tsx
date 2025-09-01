import { useState, useEffect } from 'react';
// --- NUEVO: Importamos los iconos que usaremos ---
import { FaUserCircle, FaShoppingBag } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const lightSections = document.querySelectorAll('.light-bg');
      const navbarHeight = 70;
      let inLightSection = false;

      lightSections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (window.scrollY >= sectionTop - navbarHeight && window.scrollY < sectionTop + sectionHeight - navbarHeight) {
          inLightSection = true;
        }
      });

      setScrolled(window.scrollY > 50);
      setIsLightSection(inLightSection);
    };
    
    // Si el menú está abierto, bloqueamos el scroll del body para una mejor UX
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    if (!isOpen) {
        window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Asegurarnos de restaurar el scroll si el componente se desmonta
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Función para cerrar el menú, útil para los enlaces y el logo
  const closeMenu = () => {
      setIsOpen(false);
  }

  const navClasses = `navbar-container ${scrolled ? 'scrolled' : ''} ${isLightSection ? 'light-theme' : ''}`;
  const navLinksClasses = `navbar-links ${isOpen ? 'active' : ''}`;
  const hamburgerClasses = `hamburger-menu ${isOpen ? 'active' : ''}`;

  return (
    <header className={navClasses}>
      <div className="navbar-logo">
        <a href="#home" onClick={closeMenu}>D'JAVI ESPORT</a>
      </div>
      
      {/* --- ESTRUCTURA MEJORADA: Separamos links de acciones --- */}
      <nav className="navbar-navigation">
        <ul className={navLinksClasses} onClick={closeMenu}>
          <li><a href="#home">Inicio</a></li>
          <li><a href="#about">Nosotros</a></li>
          <li><a href="#portfolio">Productos</a></li>
          <li><a href="#social">Comunidad</a></li>
          <li><a href="#map">Tiendas</a></li>
          {/* --- NUEVO: Un "Call to Action" (CTA) claro --- */}
          <li className="cta-button"><a href="#contact">Contacto</a></li>
        </ul>
      </nav>

      {/* --- NUEVO: Sección de acciones del usuario (iconos) --- */}
      <div className="navbar-actions">
        <a href="/login" aria-label="Cuenta de usuario" className="action-icon">
            <FaUserCircle />
        </a>
        <a href="/cart" aria-label="Carrito de compras" className="action-icon">
            <FaShoppingBag />
            {/* Opcional: Contador de productos en el carrito */}
            {/* <span className="cart-counter">3</span> */}
        </a>
        <button className={hamburgerClasses} onClick={toggleMenu} aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaShoppingBag } from 'react-icons/fa';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#home', label: 'Inicio' },
    { href: '#about', label: 'Nosotros' },
    { href: '#portfolio', label: 'Productos' },
    { href: '#social', label: 'Comunidad' },
    { href: '#map', label: 'Tiendas' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navClasses = `navbar-container ${scrolled ? 'scrolled' : ''}`;
  const navLinksClasses = `navbar-links ${isOpen ? 'active' : ''}`;
  const hamburgerClasses = `hamburger-menu ${isOpen ? 'active' : ''}`;

  return (
    <header className={navClasses}>
      <div className="navbar-logo">
        <a href="#home" onClick={closeMenu}>D'JAVI ESPORT</a>
      </div>

      {/* Menú para Escritorio */}
      <nav className="navbar-navigation">
        <ul>
          {navItems.map(item => (
            <li key={item.href}><a href={item.href}>{item.label}</a></li>
          ))}
          <li className="cta-button"><a href="#contact">Contacto</a></li>
        </ul>
      </nav>

      {/* Menú para Móvil (Overlay) */}
      <ul className={navLinksClasses}>
        {navItems.map(item => (
          <li key={item.href} onClick={closeMenu}><a href={item.href}>{item.label}</a></li>
        ))}
        <li className="cta-button" onClick={closeMenu}><a href="#contact">Contacto</a></li>
      </ul>

      <div className="navbar-actions">
        <a href="/login" aria-label="Cuenta de usuario" className="action-icon"><FaUserCircle /></a>
        <a href="/cart" aria-label="Carrito de compras" className="action-icon"><FaShoppingBag /></a>
      </div>

      <button className={hamburgerClasses} onClick={toggleMenu} aria-label="Toggle Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Navbar;
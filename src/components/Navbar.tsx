// src/components/Navbar.tsx

import React, { useState, useEffect } from 'react';
import { LuSearch, LuUser, LuShoppingBag } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'TIENDA', to: '/productos?categoria=nuevo' },
    { label: 'Nosotros', to: '/nosotros' }, // <-- ENLACE AÑADIDO
    { label: 'Blog', to: '/blog' }, // <-- AÑADIDO
    { label: 'Testimonios', to: '/testimonios' }, // <-- AÑADIDO
    { label: 'Ofertas', to: '/productos', isSpecial: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : 'unset'; }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navClasses = `navbar-container ${scrolled ? 'scrolled' : ''}`;
  const navLinksClasses = `navbar-links ${isOpen ? 'active' : ''}`;
  const hamburgerClasses = `hamburger-menu ${isOpen ? 'active' : ''}`;

  return (
    <header className={navClasses}>
      <div className="navbar-logo">
        <Link to="/">D'JAVI ESPORT</Link>
      </div>
      <nav className="navbar-navigation">
        <ul>
          {navItems.map(item => (
            <li key={item.label}>
              <Link to={item.to} className={`nav-link ${item.isSpecial ? 'special' : ''}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ul className={navLinksClasses}>
        {navItems.map(item => (
          <li key={item.label}><Link to={item.to}>{item.label}</Link></li>
        ))}
      </ul>
      <div className="navbar-actions">
        <button className="action-icon" aria-label="Buscar"><LuSearch /></button>
        <Link to="/login" className="action-icon" aria-label="Cuenta de usuario"><LuUser /></Link>
        <Link to="/cart" className="action-icon" aria-label="Carrito de compras">
          <div className="cart-icon-wrapper">
            <LuShoppingBag />
            <span className="cart-badge">0</span>
          </div>
        </Link>
      </div>
      <button className={hamburgerClasses} onClick={toggleMenu} aria-label="Toggle Menu">
        <span></span><span></span><span></span>
      </button>
    </header>
  );
};

export default Navbar;
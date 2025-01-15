import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = ({ cartCount }) => {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-bar__link">Inicio</Link>
      <Link to="/cart" className="nav-bar__link">
        Carrito
        {cartCount > 0 && <span className="nav-bar__cart-count">{cartCount}</span>}
      </Link>
      <Link to="/about" className="nav-bar__link">Acerca De</Link>
      <Link to="/contact" className="nav-bar__link">Contacto</Link>
    </nav>
  );
};

export default NavBar;

import React from 'react';
import '../styles/Header.css';
import NavBar from './NavBar';

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <h1 className="header__logo">D@rkCart</h1>
      <NavBar cartCount={cartCount} />
    </header>
  );
};

export default Header;

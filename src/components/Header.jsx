import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/videologo.gif';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header-section">
      <div className="header-content">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="Logo J&L Clean Co" className="logo" />
        </div>
        
        {/* Menu and Search Bar */}
        <nav className="nav-menu">
          <input type="text" placeholder="Buscar..." className="search-input" />
          <button className="search-button" onClick={() => {/* Handle search action */}}>Buscar</button>
          <button onClick={() => navigate('/')} className="nav-link"><i className="fa fa-home"></i>INICIO</button>
          <button onClick={() => navigate('/list')} className="nav-link"><i className="fa fa-list"></i>PRODUCTOS</button>
          <button onClick={() => navigate('/car')} className="nav-link"><i className="fa fa-shopping-cart"></i>CARRITO</button>
          <button onClick={() => navigate('/login')} className="nav-link"><i className="fa fa-user"></i>LOGIN</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

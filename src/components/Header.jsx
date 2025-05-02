import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/videologo.gif';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('usuario'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="header-section">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} alt="Logo J&L Clean Co" className="logo" />
        </div>

        <nav className="nav-menu">
          <input type="text" placeholder="Buscar..." className="search-input" />
          <button className="search-button" onClick={() => { /* lógica de búsqueda */ }}>Buscar</button>
          <button onClick={() => navigate('/')} className="nav-link"><i className="fa fa-home"></i> INICIO</button>
          <button onClick={() => navigate('/list')} className="nav-link"><i className="fa fa-list"></i> PRODUCTOS</button>
          <button onClick={() => navigate('/car')} className="nav-link"><i className="fa fa-shopping-cart"></i> CARRITO</button>

          <div className="login-dropdown" onMouseEnter={toggleMenu} onMouseLeave={closeMenu}>
            {user ? (
              <div className="nav-link user-info">
                <i className="fa fa-user-circle"></i> Bienvenido, {user.nombre}
                {isMenuOpen && (
                  <div className="dropdown-content">
                    <button onClick={handleLogout} className="nav-link">
                      <i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-link">
                <i className="fa fa-user"></i> LOGIN
                {isMenuOpen && (
                  <div className="dropdown-content">
                    <button onClick={() => navigate('/login')} className="nav-link">
                      <i className="fa fa-user"></i> Iniciar sesión
                    </button>
                    <button onClick={() => navigate('/registro')} className="nav-link">
                      <i className="fa-solid fa-id-card"></i> Registrarse
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

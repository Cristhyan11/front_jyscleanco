import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Carrito from './pages/Car';
import Home from './pages/home';
import Login from './pages/login';
import ProductsList from './pages/ProductsList';
import RegistrarAdmin from './pages/RegisterAdmin';
import Registro from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

function AppContent({ handleLoginSuccess }) {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/registro", "/registrar_Admin"].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registrar_Admin" element={<RegistrarAdmin />} />
        <Route path="/list" element={<ProductsList />} />
        <Route path="/car" element={<Carrito />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <AppContent handleLoginSuccess={handleLoginSuccess} />
    </Router>
  );
}

export default App;

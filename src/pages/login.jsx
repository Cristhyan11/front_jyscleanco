import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import backgroundImage from '../assets/J.jpg';

Modal.setAppElement('#root');

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://back-jyscleanco.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.status === 'Bienvenido') {
        localStorage.setItem('user_id', result._id);
        localStorage.setItem('user', result.user);
        localStorage.setItem('role', result.role);
        localStorage.setItem('usuario', JSON.stringify({ nombre: result.nombre }));
        if (onLoginSuccess) onLoginSuccess();
        navigate(result.role === 'client' ? '/list' : '/users');
      } else {
        setModalMessage(result.message || 'No es bienvenido');
      }
    } catch (error) {
      setModalMessage('Error en las credenciales');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="login-form">
        <button className="back-button" onClick={() => navigate('/')}>
          <span className="back-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="8.004" height="13.988" viewBox="0 0 8.004 13.988">
              <path d="M281.016,113a1,1,0,0,1-.707-1.707l5.3-5.293-5.293-5.293a1,1,0,0,1,1.414-1.414l6,6a1,1,0,0,1,0,1.414l-6,6a1,1,0,0,1-.711.293"
                transform="translate(288.02 113) rotate(180)" fill="#187385"></path>
            </svg>
          </span>
          <span>Volver</span>
        </button>
        <img src="/src/assets/logo-login.png" alt="Logo" className="logo" />
        <h2>Inicio de sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button">Ingresar</button>
          <a href="#" className="forgot-password">Olvidé la contraseña</a>
          <button type="button" className="register-button" onClick={() => navigate('/registro')}>Registrarse</button>
        </form>
      </div>

      <Modal
        isOpen={modalMessage !== ''}
        onRequestClose={() => setModalMessage('')}
        contentLabel="Mensaje"
        className="modal"
        overlayClassName="overlay"
      >
        <p>{modalMessage}</p>
        <button onClick={() => setModalMessage('')}>Cerrar</button>
      </Modal>
    </div>
  );
}

export default Login;
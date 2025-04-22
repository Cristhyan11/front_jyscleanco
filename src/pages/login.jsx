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

  useEffect(() => {
    // Cargar o recargar el script de reCAPTCHA
    const loadRecaptcha = () => {
      const existingScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
      if (existingScript) {
        existingScript.remove(); // Eliminar el script existente
      }

      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setModalMessage('Error al cargar reCAPTCHA. Intenta nuevamente.');
      };
      document.body.appendChild(script);
    };

    loadRecaptcha();
  }, []); // Se ejecuta cada vez que el componente se monta

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si grecaptcha está disponible
    if (typeof grecaptcha === 'undefined') {
      setModalMessage('Error al cargar reCAPTCHA. Intenta nuevamente.');
      return;
    }

    // Obtener el token de reCAPTCHA
    const token = grecaptcha.getResponse();
    if (!token) {
      setModalMessage('Por favor, completa el reCAPTCHA.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, token }),
      });

      const result = await response.json();
      if (result.status === 'Bienvenido') {
        localStorage.setItem('user_id', result._id);
        localStorage.setItem('user', result.user);
        localStorage.setItem('role', result.role);
        if (onLoginSuccess) onLoginSuccess();
        navigate(result.role === 'client' ? '/list' : '/ganadores');
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
          <div className="form-group">
            <label htmlFor="recaptcha">Verificación</label>
            <div
              className="g-recaptcha"
              data-sitekey="6LdV0v4qAAAAAJQDgJRcnN1bWzpHvgqpXXEK9Q3B"
            ></div>
          </div>
          <button type="submit" className="login-button">Ingresar</button>
          <a href="#" className="forgot-password">Olvidé la contraseña</a>
          <button type="button" className="register-button" onClick={() => navigate('/registro')}>Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
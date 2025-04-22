//RegistrarAdmin.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Asegúrate de que los estilos sean correctos

Modal.setAppElement('#root'); // Para accesibilidad

function RegistrarAdmin() {
  const [email, setEmail] = useState(''); // Cambiado a username
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    console.log('Form submitted:', { email, password });

    try {
      const response = await fetch('http://localhost:5000/api/register-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Enviar username en lugar de email
      });

      const result = await response.json();

      if (result.status === "Usuario registrado") {
        // Si se registra con éxito, puedes redirigir o mostrar un mensaje
        alert('Usuario registrado con éxito');
        navigate('/home'); // Redirige a la página de inicio o a donde desees
      } else {
        setError(result.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al registrar el usuario');
    }
  };

  const closeModal = () => {
    setError('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="ai-agent-form">
        <h2 className="form-title">Registrar Administrador</h2>
        <div className="form-group">
          <label htmlFor="email">Nombre de Usuario</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Registrar</button>
        <label htmlFor="">                           </label>
        <button type="button" className="submit-button" onClick={handleHomeClick}>Home</button>
      </form>

      <Modal
        isOpen={!!error}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={closeModal} className="submit-button">Cerrar</button>
        </div>
      </Modal>
    </div>
  );
}

export default RegistrarAdmin;

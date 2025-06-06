import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/registro.css';
import ciudadesPorApartamento from '../data/colombia.json';

Modal.setAppElement('#root');

function Registro() {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = '';
  const [cedula, setCedula] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();


    // Datos del formulario
    const data = {
      nombre,
      fechaNacimiento,
      cedula,
      celular,
      email,
      apartamento,
      ciudad,
      password,
    };

    try {
      const response = await fetch('https://back-jyscleanco.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.status === 'UsuarioRegistrado') {
        setModalMessage('Su registro fue exitoso.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setModalMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error en el registro.');
    }
  };

  const handleApartamentoChange = (e) => {
    setApartamento(e.target.value);
    setCiudad('');
  };

  // Transform colombia.json array into an object mapping departamentos to ciudades
  const departamentosYCiudades = ciudadesPorApartamento.reduce((acc, item) => {
    acc[item.departamento] = item.ciudades;
    return acc;
  }, {});

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="ai-agent-form">
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
        <h2 className="form-title">Crea una cuenta</h2>
        <div className="form-group">
          <label htmlFor="nombre">Nombre y apellido</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cedula">Cédula</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            pattern="\d{5,11}"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="celular">Celular</label>
          <input
            type="text"
            id="celular"
            name="celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            pattern="\d{3}-?\d{7}"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="apartamento">Departamento</label>
          <select
            id="apartamento"
            name="apartamento"
            value={apartamento}
            onChange={handleApartamentoChange}
            required
          >
            <option value="">Seleccione</option>
            {Object.keys(departamentosYCiudades).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ciudad">Ciudad</label>
          <select
            id="ciudad"
            name="ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            required
          >
            <option value="">Seleccione</option>
            {departamentosYCiudades[apartamento]?.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
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
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Registrarse
        </button>

        <div className="login-redirect">
          ¿Ya tienes una cuenta?{' '}
        <span
          className="login-link"
          onClick={() => navigate('/login')}
          style={{ color: '#187385', cursor: 'pointer', textDecoration: 'underline' }}
        >
        Inicia sesión
        </span>
        </div>
      </form>

      <Modal
        isOpen={!!modalMessage}
        onRequestClose={() => setModalMessage('')}
        contentLabel="Message Modal"
        className="modal1"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2>Mensaje</h2>
          <p>{modalMessage}</p>
          <button onClick={() => setModalMessage('')} className="submit-button">
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Registro;


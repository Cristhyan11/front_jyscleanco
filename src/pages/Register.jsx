import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/registro.css';

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

  // Cargar el script de reCAPTCHA al renderizar el componente
  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadRecaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el token de reCAPTCHA
    const token = grecaptcha.getResponse();
    if (!token) {
      setModalMessage('Por favor, completa el reCAPTCHA.');
      return;
    }

    // Datos del formulario
    const data = {
      token,
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
      const response = await fetch('http://localhost:5000/api/register', {
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

  const ciudadesPorApartamento = {
    Amazonas: ['Leticia', 'Puerto Nariño'],
    Antioquia: ['Medellín', 'Envigado', 'Itagüí'],
    Cundinamarca: ['Bogotá', 'Soacha', 'Chía'],
    ValleDelCauca: ['Cali', 'Palmira', 'Tuluá'],
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="ai-agent-form">
        <h2 className="form-title">Digita Tus Datos y Gana</h2>

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
          <label htmlFor="apartamento">Apartamento</label>
          <select
            id="apartamento"
            name="apartamento"
            value={apartamento}
            onChange={handleApartamentoChange}
            required
          >
            <option value="">Seleccione</option>
            {Object.keys(ciudadesPorApartamento).map((region) => (
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
            {ciudadesPorApartamento[apartamento]?.map((city, index) => (
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
        <div className="form-group">
          <label htmlFor="recaptcha">Verificación</label>
          <div
            className="g-recaptcha"
            data-sitekey="6LdV0v4qAAAAAJQDgJRcnN1bWzpHvgqpXXEK9Q3B"
          ></div>
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


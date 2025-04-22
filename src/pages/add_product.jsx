import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AgregarProducto.css';

function AgregarProducto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cant, setCant] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setImagen(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('cant', cant);
    formData.append('description', descripcion);
    formData.append('image', imagen);
    formData.append('Fecha_agregado', new Date().toISOString());

    try {
      const response = await fetch('http://localhost:5000/api/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Producto agregado exitosamente');
        navigate('/list');
      } else {
        console.error('Error al agregar el producto');
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <div className="agregar-producto">
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>
        <label>
          Precio:
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </label>
        <label>
          Cantidad:
          <input type="number" value={cant} onChange={(e) => setCant(e.target.value)} required />
        </label>
        <label>
          Descripción:
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
        </label>
        <label>
          Imagen:
          <input type="file" onChange={handleFileChange} required />
        </label>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default AgregarProducto;

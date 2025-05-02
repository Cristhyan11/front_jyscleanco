import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/carrito.css';

Modal.setAppElement('#root'); // Necesario para accesibilidad

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user_id] = useState(localStorage.getItem('user_id'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/carrito?user_id=${user_id}`);
        const result = await response.json();

        if (result.status === 'Success') {
          setCartItems(result.data);
        } else {
          console.error('Error al obtener productos del carrito:', result.message);
        }
      } catch (error) {
        console.error('Error al obtener productos del carrito:', error);
      }
    };

    fetchCartItems();
  }, [user_id]);

  const removeItem = async (producto_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/carrito/${producto_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
      if (result.status === 'Success') {
        setCartItems(cartItems.filter(item => item.producto_id !== producto_id));
        setModalMessage('Producto eliminado del carrito.');
        setIsModalOpen(true);
  
        // Recargar la página después de 2 segundos
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (result.status === 'NotFound') {
        setModalMessage('El producto no se encontró en el carrito.');
        setIsModalOpen(true);
      } else if (result.status === 'InvalidID') {
        setModalMessage('El producto_id no es válido.');
        setIsModalOpen(true);
      } else {
        setModalMessage('Error al eliminar producto del carrito.');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      setModalMessage('Error al eliminar producto del carrito.');
      setIsModalOpen(true);
    }
  };
  return (
    <section className="carrito">
      <h2>Tu Carrito</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div className="cart-item" key={item._id}>
            <img
              src={item.image}
              alt={item.nombre}
              className="cart-item-image"
            />
            <h3 className="cart-item-name">{item.nombre}</h3>
            <p className="cart-item-price">Precio unitario: ${item.precio}</p>
            <p className="cart-item-quantity">Cantidad: {item.cantidad}</p>
            <p className="cart-item-total">Total: ${item.total}</p>
            <button className="remove-btn" onClick={() => removeItem(item._id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/list')} className="checkout-btn">Volver a la tienda</button>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmación"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{modalMessage}</h2>
        <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
      </Modal>
    </section>
  );
};

export default Cart;
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
          // Aquí está el problema: la respuesta tiene una estructura diferente
          setCartItems(result.data.items || []);
        } else {
          console.error('Error al obtener productos del carrito:', result.message);
        }
      } catch (error) {
        console.error('Error al obtener productos del carrito:', error);
      }
    };

    if (user_id) {
      fetchCartItems();
    }
  }, [user_id]);

  // Función corregida para eliminar item
  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/carrito/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
      if (result.status === 'Success') {
        // Filtrar por el _id del item, no por user_id
        setCartItems(cartItems.filter(item => item._id !== itemId));
        setModalMessage('Producto eliminado del carrito.');
        setIsModalOpen(true);
  
        // Opcional: recargar después de 2 segundos
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (result.status === 'NotFound') {
        setModalMessage('El producto no se encontró en el carrito.');
        setIsModalOpen(true);
      } else if (result.status === 'InvalidID') {
        setModalMessage('El ID del producto no es válido.');
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

  // Función para calcular total
  const calculateTotal = (precio, cantidad) => {
    return (parseFloat(precio) * cantidad).toFixed(2);
  };

  // Función para calcular total del carrito
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.producto.precio) * item.cantidad);
    }, 0).toFixed(2);
  };

  return (
    <section className="carrito">
      <h2>Tu Carrito</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <img
                src={item.producto.image}
                alt={item.producto.nombre}
                className="cart-item-image"
              />
              <h3 className="cart-item-name">{item.producto.nombre}</h3>
              <p className="cart-item-price">Precio unitario: ${item.producto.precio}</p>
              <p className="cart-item-quantity">Cantidad: {item.cantidad}</p>
              <p className="cart-item-total">
                Total: ${calculateTotal(item.producto.precio, item.cantidad)}
              </p>
              <button 
                className="remove-btn" 
                onClick={() => removeItem(item._id)}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total del carrito: ${calculateCartTotal()}</h3>
        </div>
      )}
      
      <button onClick={() => navigate('/list')} className="checkout-btn">
        Volver a la tienda
      </button>

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
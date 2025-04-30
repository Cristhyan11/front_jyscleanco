import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/carrito.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user_id] = useState(localStorage.getItem('user_id'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Obtener los datos del carrito con detalles de productos
        const response = await fetch(`http://localhost:5000/api/carrito?user_id=${user_id}`);
        const result = await response.json();

        if (result.status === 'Success') {
          setCartItems(result.data); // Los datos ya incluyen los detalles del producto
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
      // Realizar la solicitud DELETE con el producto_id en la URL
      const response = await fetch(`http://localhost:5000/api/carrito/${producto_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
      if (result.status === 'Success') {
        // Actualizar el estado del carrito eliminando el producto
        setCartItems(cartItems.filter(item => item.producto_id !== producto_id));
      } else if (result.status === 'NotFound') {
        console.warn('El producto no se encontró en el carrito:', result.message);
      } else if (result.status === 'InvalidID') {
        console.error('El producto_id no es válido:', result.message);
      } else {
        console.error('Error al eliminar producto del carrito:', result.message);
      }
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
    }
  };

  return (
    <section className="carrito">
      <h2>Tu Carrito</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div className="cart-item" key={item._id}>
            <img src={`http://localhost:5000/images/${item.image}`} alt={item.nombre} className="cart-item-image" />
            <h3 className="cart-item-name">{item.nombre}</h3>
            <p className="cart-item-price">Precio unitario: ${item.precio}</p>
            <p className="cart-item-quantity">Cantidad: {item.cantidad}</p>
            <p className="cart-item-total">Total: ${item.total}</p>
            <button className="remove-btn" onClick={() => removeItem(item._id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/list')} className="checkout-btn">Volver a la tienda</button>
    </section>
  );
};

export default Cart;
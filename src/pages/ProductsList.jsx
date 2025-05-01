import React, { useEffect, useState } from 'react';
import '../styles/ProductsList.css';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const ProductsList = () => {
  const [products, setProducts] = useState([]); // Cambiado para almacenar productos
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalContent, setModalContent] = useState('');
  const [user_id] = useState(localStorage.getItem('user_id'));
  const navigate = useNavigate();

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productos'); // Cambia la URL según tu API
        const result = await response.json();
        if (result.status === 'Success') {
          console.log(result.data); // Verifica los datos obtenidos
          setProducts(result.data); // Asignar los productos obtenidos
        } else {
          console.error('Error al obtener productos:', result.message);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
  
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const addToCart = async () => {
    if (!selectedProduct) return;
    try {
      const response = await fetch('http://localhost:5000/api/carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          producto_id: selectedProduct._id,
          cantidad: quantity,
          fecha_hora: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      if (result.status === 'Success') {
        setModalContent(`${selectedProduct.nombre} ha sido agregado al carrito.`);
      } else {
        console.error('Error al agregar producto al carrito:', result.message);
        setModalContent('Error al agregar producto al carrito.');
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      setModalContent('Error al agregar producto al carrito.');
    } finally {
      setModalIsOpen(false);
      setQuantity(1);
    }
  };

  const goToCart = () => {
    navigate('/car');
  };

  return (
    <>
      <section className="productos-lista">
        <h2>Productos Disponibles</h2>
        <div className="productos-grid">
          {products.map((product) => (
            <div className="producto" key={product._id}>
            <img
              src={product.image} // Usa directamente la URL de Cloudinary
              alt={product.nombre}
              className="producto-imagen"
            />
              <h4 className="producto-nombre">{product.nombre}</h4>
              <p className="producto-precio">Precio: ${product.precio}</p>
              <p className="producto-descripcion">{product.description}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>

        <button onClick={goToCart} className="go-to-cart-btn">
          Ir al carrito
        </button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Seleccione cantidad"
          className="modal"
          overlayClassName="overlay"
        >
          {selectedProduct && (
            <div>
              <h2>{`Agregar ${selectedProduct.nombre} al carrito`}</h2>
              <label>
                Cantidad:
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                />
              </label>
              <button onClick={addToCart}>Agregar</button>
              <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
            </div>
          )}
          {modalContent && <h2>{modalContent}</h2>}
        </Modal>
      </section>
    </>
  );
};

export default ProductsList;
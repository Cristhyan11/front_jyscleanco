import React, { useEffect, useState } from 'react';
import '../styles/ProductsList.css';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const ProductsList = () => {
  const [produc, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [user_id] = useState(localStorage.getItem('user_id'));
  const navigate = useNavigate();

  const staticCategories = [
    {
      name: "Limpieza del Hogar",
      products: [
        { name: "Limpiadores multiusos", description: "Descripción: Producto de limpieza versátil diseñado para eliminar suciedad, grasa y bacterias en múltiples superficies. Usos: Ideal para limpiar pisos, cocinas, baños y superficies lavables. Presentación: Botellas de 500 ml, 1 L y 5 L con tapa dosificadora o atomizador.", price: 10000},
        { name: "Ceras", description: "Descripción", price: 15000 },
        { name: "Desinfectantes", description: "Descripción", price: 12000 },
        { name: "Desengrasantes", description: "Descripción", price: 14000 },
        { name: "Ambientadores", description: "Descripción", price: 7000 },
        { name: "Detergentes", description: "Descripción", price: 6000 },
        { name: "Suavizantes", description: "Descripción", price: 5000 },
      ],
    },
    {
      name: "Cuidado Personal",
      products: [
        { name: "Cremas y Lociones", description: "Descripción", price: 20000 },
        { name: "Shampoo", description: "Descripción", price: 15000 },
        { name: "Acondicionadores", description: "Descripción", price: 15000 },
        { name: "Jabones líquidos", description: "Descripción", price: 5000 },
        { name: "Jabones en barra", description: "Descripción", price: 3000 },
        { name: "Desodorantes", description: "Descripción", price: 10000 },
        { name: "Perfumes", description: "Descripción", price: 25000 },
      ],
    },
    {
      name: "Aromatización y Ambientadores",
      products: [
        { name: "Ambientadores para el Hogar", description: "Descripción", price: 10000 },
        { name: "Aromatización para Vehículos", description: "Descripción", price: 8000 },
        { name: "Velas", description: "Descripción", price: 12000 },
        { name: "Aceites Esenciales", description: "Descripción", price: 15000 },
      ],
    },
    {
      name: "Productos Especiales",
      products: [
        { name: "Ecológicos y Biodegradables", description: "Descripción", price: 18000 },
        { name: "Desinfectantes y Antibacteriales", description: "Descripción", price: 10000 },
        { name: "Insecticidas", description: "Descripción", price: 9000 },
        { name: "Repelentes", description: "Descripción", price: 7000 },
      ],
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const result = await response.json();
        if (result.status === 'Success') {
          setCategories(result.data);
        } else {
          console.error('Error al obtener categorías:', result.message);
        }
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/list');
        const result = await response.json();
        if (result.status === 'Success') {
          setProducts(result.data);
        } else {
          console.error('Error al obtener productos:', result.message);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const addToCart = async () => {
    if (!selectedProduct) return;
    try {
      const response = await fetch('http://localhost:5000/api/list', {
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
    navigate('/cart');
  };

  return (
    <>
      <section className="productos-lista">
        <h2>Categorías</h2>
        
        {/* Botones de categorías dinámicas */}
        <div className="categorias-lista">
          {categories.map(category => (
            <button key={category._id} onClick={() => setSelectedCategory(category.name)}>
              {category.name}
            </button>
          ))}
        </div>

        {/* Categorías estáticas */}
        <div className="productos-grid">
          {staticCategories.map(category => (
            <div key={category.name}>
              <h3>{category.name}</h3>
              {category.products.map(product => (
                <div className="producto" key={product.name}>
                  <h4 className="producto-nombre">{product.name}</h4>
                  <p className="producto-precio">Precio: ${product.price}</p>
                  <p className="producto-descripcion">{product.description}</p>
                  <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
                </div>
              ))}
            </div>
          ))}
        </div>

        <button onClick={goToCart} className="go-to-cart-btn">Ir al carrito</button>

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
                <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" />
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

import React from 'react';
import productImage1 from '../assets/producto1.jpg';
import productImage2 from '../assets/producto2.jpg';
import productImage4 from '../assets/producto4.jpg';
import productImage5 from '../assets/producto5.jpg';
import productImage6 from '../assets/producto6.jpg';
import productImage7 from '../assets/producto7.jpg';
import productImage8 from '../assets/producto8.jpg';
import '../styles/Products.css';



const products = [
  { id: 1, name: 'Ambientador', price: 15000, image: productImage7 },
  { id: 2, name: 'Limpiador multiusos', price: 12000, image: productImage8 },
  { id: 3, name: 'Crema de Cuerpo', price: 19000, image: productImage1 },
  { id: 4, name: 'Crema de Coco', price: 19000, image: productImage4 },
  { id: 5, name: 'Aceite de Cuerpo', price: 25000, image: productImage5 },
  { id: 6, name: 'Productos Varios', price: 100000, image: productImage6 },
  { id: 7, name: 'Ambientador Lavanda', price: 16000, image: productImage2 },
];

const Products = () => {
  return (
    <section className="productos">
      <h2>PRODUCTOS DESTACADOS</h2>
      <div className="productos-grid">
        {products.map(product => (
          <div className="producto" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;

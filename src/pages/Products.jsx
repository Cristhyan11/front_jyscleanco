import React from 'react';
import '../styles/Products.css';

const products = [
  { 
    id: 1, 
    name: 'Ambientador', 
    price: 15000, 
    image: 'https://res.cloudinary.com/dk57jmb4o/image/upload/v1746133162/Ambientador_mw5zn7.jpg' 
  },
  { 
    id: 2, 
    name: 'Limpiador multiusos', 
    price: 12000, 
    image: 'https://res.cloudinary.com/dk57jmb4o/image/upload/v1746133165/Limpiador_multiusos_p4lm4i.jpg' 
  },
  { 
    id: 3, 
    name: 'Jabon Liquido Antibacterial', 
    price: 19000, 
    image: 'https://res.cloudinary.com/dk57jmb4o/image/upload/v1746133204/Aceite_de_Cuerpo_up3ddo.jpg' 
  },
  { 
    id: 4, 
    name: 'Crema de Coco', 
    price: 19000, 
    image: 'https://res.cloudinary.com/dk57jmb4o/image/upload/v1746133164/Crema_de_Coco_hqwy9b.jpg' 
  },
  { 
    id: 5, 
    name: 'Aceite Escenciales Lavanda', 
    price: 25000, 
    image: 'https://res.cloudinary.com/dk57jmb4o/image/upload/v1745981945/producto2_ftdsj1.jpg' 
  },

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
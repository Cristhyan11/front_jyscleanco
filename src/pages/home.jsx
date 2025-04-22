import React from 'react';
import '../styles/Home.css';
import Products from './Products';

const Home = () => {
  return (
    <div>
      <main className="main">
        <Products />
      </main>
    </div>
  );
};

export default Home;

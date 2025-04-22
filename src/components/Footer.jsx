import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <div className="footer-content">
        <p>J&L Clean Co.</p>
        <div className="social">
          <a href="https://wa.me/123456789" title="WhatsApp" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-whatsapp"></i>
          </a>
          <a href="https://facebook.com" title="Facebook" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://instagram.com" title="Instagram" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="https://twitter.com" title="Twitter" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

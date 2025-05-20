import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a ManageMyStay</h1>
        <p>Encuentra y reserva los mejores hoteles para tu próxima estadía.</p>
      </header>
      <section className="home-search">
        <input type="text" placeholder="¿A dónde quieres ir?" className="home-input" />
        <button className="home-btn">Buscar hoteles</button>
      </section>
      <section className="home-features">
        <div className="feature-card">
          <h3>Fácil de usar</h3>
          <p>Reserva tu hotel en pocos pasos y sin complicaciones.</p>
        </div>
        <div className="feature-card">
          <h3>Mejores precios</h3>
          <p>Compara y encuentra las mejores ofertas del mercado.</p>
        </div>
        <div className="feature-card">
          <h3>Atención personalizada</h3>
          <p>Soporte 24/7 para ayudarte en todo momento.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

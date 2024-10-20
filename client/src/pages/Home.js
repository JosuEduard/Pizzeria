// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import imgPizza from '../assets/img/pizza.png';

const Home = () => {
  return (
    <div className="home-body">
      <div className="home-container">
        <header className="home-header">
          <div className='header-left'>
            <img src={imgPizza} alt='Logo de Pizzería Macana' />
            <h1>Pizzería Macana</h1>
          </div>
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
            <Link to="/signup" className="btn btn-secondary">Registrarse</Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Home;
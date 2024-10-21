import React from 'react';
import '../styles/header.css'; // Aquí cargamos los estilos para el header
//Importando imagenes
import pizzaLogo from '../assets/img/pizza.png'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Gestion de Sistema de Pizzería - Macana</h1>
      </div>
      <div className="header-right">
        <img src={pizzaLogo} alt="Pizza Logo" className="pizza-logo" />
      </div>
    </header>
  );
}

export default Header;

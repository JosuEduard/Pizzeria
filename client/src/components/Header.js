import React from 'react';
import '../styles/header.css'; // Aquí cargamos los estilos para el header
import { IconMenu2 } from '@tabler/icons-react';
//Importando imagenes
import pizzaLogo from '../assets/img/pizza.png'; 

function Header({ toggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        {/* Ícono de menú hamburguesa */}
        <button className="menu-btn" onClick={toggleSidebar}>
          <i><IconMenu2 stroke={2}/></i>
        </button>
        <h1 className="header-title">Gestion de Sistema de Pizzería</h1>
      </div>
      <div className="header-right">
        <img src={pizzaLogo} alt="Pizza Logo" className="pizza-logo" />
      </div>
    </header>
  );
}

export default Header;

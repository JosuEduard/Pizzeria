// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.css'
import App from './App.js';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
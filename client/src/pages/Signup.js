import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/signup.css'; // Importa el archivo CSS para el signup
import logo from '../assets/img/pizza.png'; // Importa la imagen del pizza

const Signup = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !contactNumber || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('http://localhost:8080/user/signup', { name, contactNumber, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message || 'An error occurred during signup');
    }
  };

  return (
    <div className="signup-container">
      <img src={logo} alt='Pizza Logo' className='pizza-logo' />
      <div className="signup-form">
        <h2>Crear una nueva cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nombre completo:</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="contact-number">Número de contacto:</label>
            <input
              id="contact-number"
              name="contactNumber"
              type="tel"
              // pattern="[0-9]{10}"
              required
              placeholder="76767676"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email-address">Correo electrónico:</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="ejemplo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="signup-button">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

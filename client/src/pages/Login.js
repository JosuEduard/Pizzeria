import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';  // Importa los estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/login', { email, password });
  
      if (response.data.success) {
        console.log("Login exitoso");
        navigate('/dashboard'); // Redirige al dashboard
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <section className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login de Pizzería</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor="email-address" className="input-label">Correo Electrónico</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Ingresa tu correo"
              value={email}
              className='login-input'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-group'>
            <label htmlFor="password" className="input-label">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className='login-input'
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">Iniciar Sesión</button>
        </form>
      </div>
    </section>
  );
};

export default Login;

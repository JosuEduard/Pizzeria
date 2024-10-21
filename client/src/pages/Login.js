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
  
      // Comprueba si el campo 'success' existe y si es true
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
    
    <section className="login-container">
    <div className="container">
      <h2>Login de Pizzería</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor="email-address">Correo Electrónico</label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
    </section>
  );
};

export default Login;

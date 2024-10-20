import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardDetails } from '../services/api'; // Asegúrate de que esta función esté definida
import '../styles/dashboard.css'; // Asegúrate de que el archivo CSS exista

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardDetails(); // Llama a la API para obtener los datos
        console.log('Datos del dashboard:', data); // Verifica los datos aquí
        setDashboardData(data); // Establece los datos en el estado
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Error al cargar los datos del dashboard.'); // Manejo de errores
      }
    };

    fetchDashboardData(); // Llama a la función para obtener los datos
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de autenticación
    navigate('/login'); // Redirige al usuario a la página de login
  };

  if (error) {
    return <div className="error-message">{error}</div>; // Muestra el mensaje de error
  }

  if (!dashboardData) {
    return <div className="loading">Cargando...</div>; // Mensaje de carga
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard de Pizzería</h2>
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Cantidad de Categorías</h3>
          <p>{dashboardData.categoryCount}</p> {/* Muestra la cantidad de categorías */}
        </div>
        <div className="card">
          <h3>Cantidad de Productos</h3>
          <p>joder</p> {/* Muestra la cantidad de productos */}
        </div>
        <div className="card">
          <h3>Cantidad de Facturas</h3>
          <p>{dashboardData.billCount}</p> {/* Muestra la cantidad de facturas */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
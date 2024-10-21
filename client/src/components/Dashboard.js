import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardDetails } from '../services/api';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardDetails();
        console.log('Datos del dashboard:', response);
        setDashboardData(response);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError("Error al cargar los datos del dashboard.");
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard de Pizzería</h2>
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Cantidad de Categorías</h3>
          <p>{dashboardData.categoryCount || 0}</p>
        </div>
        <div className="card">
          <h3>Cantidad de Productos</h3>
          <p>{dashboardData.productCount || 0}</p>
        </div>
        <div className="card">
          <h3>Cantidad de Facturas</h3>
          <p>{dashboardData.billCount || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

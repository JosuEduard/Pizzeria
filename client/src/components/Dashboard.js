import React, { useEffect, useState } from 'react';
import '../styles/dashbord.css'; // Importamos los estilos para el Dashboard
// import axios from 'axios';
import { getDashboardDetails } from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardDetails();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="section-dashboard">
      <p className="title">Dashboard</p>
    <div className="dashboard">
      <div className="card">
        <h2>Cantidad de Categorías</h2>
        <p>{dashboardData.category}</p>
      </div>
      <div className="card">
        <h2>Cantidad de Productos</h2>
        <p>{dashboardData.product}</p>
      </div>
      <div className="card">
        <h2>Cantidad de Facturas</h2>
        <p>{dashboardData.bill}</p>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

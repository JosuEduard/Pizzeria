import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css'; // Importamos los estilos para el Dashboard
import { getDashboardDetails } from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';   

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
    <>
      {/* Renderizamos el Header */}
      <Header />

      <div className="dashboard-container">
        {/* Renderizamos el Sidebar */}
        <Sidebar />

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
      </div>
    </>
  );
};

export default Dashboard;

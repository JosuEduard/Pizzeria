import React, { useEffect, useState } from 'react';
import '../styles/dashbord.css'; // Importamos los estilos para el Dashboard
import axios from 'axios';

const Dashboard = () => {
  const [details, setDetails] = useState({
    category: 0,
    product: 0,
    bill: 0
  });

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
      const response = await axios.get('http://localhost:8080/dashboard/details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchDetails(); // Llamamos a la API cuando el componente se monta
  }, []);

  return (
    <div className="section-dashboard">
      <p className="title">Dashboard</p>
    <div className="dashboard">
      <div className="card">
        <h2>Cantidad de Categorías</h2>
        <p>{details.category}</p>
      </div>
      <div className="card">
        <h2>Cantidad de Productos</h2>
        <p>{details.product}</p>
      </div>
      <div className="card">
        <h2>Cantidad de Facturas</h2>
        <p>{details.bill}</p>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

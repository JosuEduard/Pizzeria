import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/bill.css'; 

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchBills = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/bill/getBills');
      const data = await response.json();
      if (response.ok) {
        setBills(data);
      } else {
        setError(data.message || "Error al cargar las facturas.");
      }
    } catch (error) {
      console.error('Error fetching bill data:', error);
      setError("Error al cargar las facturas.");
    }
  }, []);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const handleDeleteBill = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta factura?")) {
      try {
        const response = await fetch(`http://localhost:8080/bill/delete/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchBills();
        } else {
          const data = await response.json();
          setError(data.message || "Error al eliminar la factura.");
        }
      } catch (error) {
        setError('Error al eliminar la factura');
      }
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (bills.length === 0) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Gestión de Facturas</h2>
      <div className="bill-content">
        {bills.map((bill) => (
          <div key={bill.id} className="bill-card">
            <h3>Factura ID: {bill.uuid}</h3>
            <p>Nombre: {bill.name}</p>
            <p>Email: {bill.email}</p>
            <p>Teléfono: {bill.contactNumber}</p>
            <p>Método de Pago: {bill.paymentMethod}</p>
            <p>Total: ${bill.total}</p>
            <div className="button-group">
              <button onClick={() => navigate(`/bill/${bill.uuid}`)}>Ver PDF</button>
              <button onClick={() => handleDeleteBill(bill.id)} className="delete-button">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bill; 
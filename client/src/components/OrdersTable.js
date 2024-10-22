import React, { useState, useEffect } from 'react';
import '../styles/order.css';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/order/get');
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      } else {
        setError('Error al cargar los pedidos');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error al cargar los pedidos');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatStatus = (status) => {
    const statusClasses = {
      'pending': 'status-pending',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return <span className={`status-badge ${statusClasses[status] || 'status-pending'}`}>
      {status || 'Pendiente'}
    </span>;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  if (isLoading) {
    return <div className="loading">Cargando pedidos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="orders-container">
      <h2 className="orders-title">Pedidos Realizados</h2>
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Contacto</th>
              <th>Método de Pago</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{formatDate(order.created_at)}</td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{order.name}</span>
                      <span className="customer-email">{order.email}</span>
                    </div>
                  </td>
                  <td>{order.contact_number}</td>
                  <td>{order.payment_method}</td>
                  <td className="total-amount">
                    {formatCurrency(order.total_amount)}
                  </td>
                  <td>{formatStatus(order.status)}</td>
                  <td className="actions-cell">
                    <button 
                      className="action-btn view-btn"
                      onClick={() => console.log('Ver detalles', order.id)}
                    >
                      Ver
                    </button>
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => console.log('Editar', order.id)}
                    >
                      Editar
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => console.log('Eliminar', order.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-orders">
                  No hay pedidos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
// OrdersTable.jsx
import React, { useState } from 'react';
import '../styles/order.css';

const OrdersTable = ({ orders, onEdit, onDelete, isLoading, error }) => {
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

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
      onDelete(id);
    }
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
                      className="action-btn edit-btn"
                      onClick={() => onEdit(order)}
                    >
                      Editar
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(order.id)}
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
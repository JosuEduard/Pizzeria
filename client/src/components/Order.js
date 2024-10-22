import React, { useState, useEffect, useCallback } from 'react';
import '../styles/order.css';
import OrdersTable from '../components/OrdersTable';

const Order = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    contactNumber: '',
    paymentMethod: 'Credit Card',
  });

  // Fetch functions
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/product/get');
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        setError(data.message || "Error al cargar los productos.");
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError("Error al cargar los productos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/category/get');
      const data = await response.json();
      if (response.ok) {
        setCategories(data.results);
      } else {
        setError(data.message || "Error al cargar las categorías.");
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
      setError("Error al cargar las categorías.");
    } finally {
      setIsLoading(false);
    }
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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchOrders();
  }, [fetchProducts, fetchCategories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const resetForm = () => {
    setOrderDetails({
      name: '',
      email: '',
      contactNumber: '',
      paymentMethod: 'Credit Card',
    });
    setSelectedCategory('');
    setSelectedProduct('');
    setQuantity(1);
    setEditingOrder(null);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setOrderDetails({
      name: order.name,
      email: order.email,
      contactNumber: order.contact_number,
      paymentMethod: order.payment_method,
    });
    // Aquí podrías también establecer la categoría y producto si los tienes en los datos
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/order/delete/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Actualizar la lista de órdenes después de eliminar
        fetchOrders();
      } else {
        const data = await response.json();
        setError(data.message || 'Error al eliminar la orden');
      }
    } catch (error) {
      console.error('Error al eliminar la orden:', error);
      setError('Error al eliminar la orden');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedProduct) {
      setError('Selecciona una categoría y un producto.');
      return;
    }

    const selectedProductData = products.find(p => p.id === parseInt(selectedProduct));
    if (!selectedProductData) {
      setError('Producto no encontrado');
      return;
    }

    const total = selectedProductData.price * quantity;

    const orderData = {
      name: orderDetails.name,
      email: orderDetails.email,
      contact_number: orderDetails.contactNumber,
      payment_method: orderDetails.paymentMethod,
      total_amount: total
    };

    try {
      let response;
      if (editingOrder) {
        // Si estamos editando, incluimos el ID en los datos
        orderData.id = editingOrder.id;
        response = await fetch('http://localhost:8080/order/update', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
      } else {
        // Si es una nueva orden
        response = await fetch('http://localhost:8080/order/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...orderData,
            products: [{
              category: selectedCategory,
              product: selectedProduct,
              price: selectedProductData.price,
              quantity: quantity,
              total: total
            }]
          }),
        });
      }

      const data = await response.json();
      if (response.ok) {
        resetForm();
        fetchOrders();
      } else {
        setError(data.message || "Error al procesar la orden.");
      }
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      setError("Error al procesar la orden.");
    }
  };

  if (isLoading && !orders.length) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="order-container">
      <h2 className='dashboard-title'>
        {editingOrder ? 'Editar orden' : 'Nueva orden'}
      </h2>
      {error && <div className="error-message">{error}</div>}
      <form className="order-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Datos del cliente</legend>
          <div className="form-group">
            <label>Nombre del cliente:</label>
            <input
              className="form-input"
              type="text"
              name="name"
              value={orderDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico:</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={orderDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Número de contacto:</label>
            <input
              className="form-input"
              type="text"
              name="contactNumber"
              value={orderDetails.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Datos del pedido</legend>
          <div className="form-group">
            <label>Selecciona una categoría:</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div className="form-group">
              <label>Selecciona un producto:</label>
              <select
                className="form-select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                required
              >
                <option value="">Seleccione un producto</option>
                {Array.isArray(products) && products
                  .filter(product => product.categoryId === parseInt(selectedCategory))
                  .map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Cantidad:</label>
            <input
              className="form-input"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Método de pago:</label>
            <select
              className="form-select"
              name="paymentMethod"
              value={orderDetails.paymentMethod}
              onChange={handleInputChange}
              required
            >
              <option value="Tarjeta de crédito">Tarjeta de crédito</option>
              <option value="Efectivo">Efectivo</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
        </fieldset>

        <div className="form-actions">
          <button className="submit-btn" type="submit">
            {editingOrder ? 'Actualizar pedido' : 'Hacer pedido'}
          </button>
          {editingOrder && (
            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <OrdersTable
        orders={orders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Order;
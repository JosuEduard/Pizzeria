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
  const [isLoading, setIsLoading] = useState(true);// Cambiado a true inicialmente
  const [orders, setOrders] = useState([]); 
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    contactNumber: '',
    paymentMethod: 'Credit Card',
  });

  // 2. Función para obtener productos
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

  // 3. Función para obtener categorías
  // Función para obtener categorías
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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedProduct) {
      setError('Selecciona una categoría y un producto.');
      return;
    }

    // Encontrar el producto seleccionado para obtener su precio
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
      total_amount: total,
      products: [{
        category: selectedCategory,
        product: selectedProduct,
        price: selectedProductData.price,
        quantity: quantity,
        total: total
      }]
    };
  
    try {
      const response = await fetch('http://localhost:8080/order/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Orden agregada exitosamente:', data);
        // Limpiar el formulario
        setOrderDetails({
          name: '',
          email: '',
          contactNumber: '',
          paymentMethod: 'Credit Card',
        });
        setSelectedCategory('');
        setSelectedProduct('');
        setQuantity(1);
        setError('');
        
        // Llamar a fetchOrders para actualizar la tabla inmediatamente
        fetchOrders();
      } else {
        setError(data.message || "Error al agregar la orden.");
      }
    } catch (error) {
      console.error('Error al enviar la orden:', error);
      setError("Error al agregar la orden.");
    }
  };


  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="order-container">
      <h2 className='dashboard-title'>Nueva orden</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="order-form " onSubmit={handleSubmit}>
        {/* Nombre del cliente */}
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

          {/* Email del cliente */}
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

          {/* Número de contacto */}
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
        {/* Seleccionar categoría */}
        <fieldset>
          <legend>Datos del pedido</legend>
          {/* Seleccionar categoría */}
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

          {/* Seleccionar producto */}
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

          {/* Cantidad */}
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


          {/* Método de pago */}
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
        <button className="submit-btn" type="submit">Hacer pedido</button>
      </form>
      <OrdersTable />
    </div>
  );
};

export default Order;
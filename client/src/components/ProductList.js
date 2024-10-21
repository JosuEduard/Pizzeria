import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/product.css';

const ProductManager = () => {
  // 1. Estado
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    categoryId: '',
    description: '',
    price: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const navigate = useNavigate();

  // 2. Función para obtener productos
  const fetchProducts = useCallback(async () => {
    try {
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
    }
  }, []);

  // 3. Función para obtener categorías
  const fetchCategories = useCallback(async () => {
    try {
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
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // 4. Función para agregar/actualizar producto
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newProduct.name.trim() || !newProduct.description.trim() || !newProduct.price || newProduct.categoryId === '') {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      if (isEditing) {
        const response = await fetch(`http://localhost:8080/product/update`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: editingProductId, ...newProduct }),
        });

        if (response.ok) {
          setIsEditing(false);
          setEditingProductId(null);
          setNewProduct({ name: '', categoryId: '', description: '', price: '' });
          fetchProducts();
        } else {
          const data = await response.json();
          setError(data.message || "Error al actualizar el producto.");
        }
      } else {
        const response = await fetch('http://localhost:8080/product/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          setNewProduct({ name: '', categoryId: '', description: '', price: '' });
          fetchProducts();
        } else {
          const data = await response.json();
          setError(data.message || "Error al agregar el producto.");
        }
      }
    } catch (error) {
      setError('Error al enviar los datos del producto');
    }
  };

  // 5. Función para cargar el formulario con el producto seleccionado
  const handleEditProduct = (product) => {
    setNewProduct({
      name: product.name,
      categoryId: product.categoryId,
      description: product.description,
      price: product.price,
    });
    setIsEditing(true);
    setEditingProductId(product.id);
  };

  // 6. Función para eliminar producto
  const handleDeleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        const response = await fetch(`http://localhost:8080/product/delete/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchProducts(); // Recargar la lista después de eliminar
        } else {
          const data = await response.json();
          setError(data.message || "Error al eliminar el producto.");
        }
      } catch (error) {
        setError('Error al eliminar el producto');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Gestión de Productos</h2>

      <div className="product-content">
        <form onSubmit={handleFormSubmit} className="product-form">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Nombre del producto"
            className="product-input"
            required
          />
          <select
            value={newProduct.categoryId}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
            className="product-select"
            required
          >
            <option value="" disabled required>Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <textarea
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            placeholder="Descripción del producto"
            className="product-textarea"
            required
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder="Precio del producto"
            className="product-input"
            required
          />
          <button type="submit" className="add-button-product">
            {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>

        <div className="product-list">
          <h3>Lista de Productos</h3>
          {products.length === 0 ? (
            <p className='NohayCategorias'>No hay productos disponibles.</p>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th className="actions-column">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.categoryId}</td>
                    <td>{product.description}</td>
                    <td>$ {product.price}</td>
                    <td className="button-group">
                      <button onClick={() => handleEditProduct(product)} className="actualizar-button">
                        Actualizar
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="eliminar-button">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;

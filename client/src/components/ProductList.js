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

  // 4. Función para agregar producto
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.categoryId.trim() || !newProduct.description.trim() || !newProduct.price) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    try {
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
    } catch (error) {
      setError('Error al agregar el producto');
    }
  };
  // 5. Función para actualizar producto
  const handleUpdateProduct = async (id, updatedProduct) => {
    if (!updatedProduct.name.trim() || !updatedProduct.description.trim() || !updatedProduct.price) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/product/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updatedProduct }),
      });
      if (response.ok) {
        fetchProducts(); // Recargar la lista después de actualizar
      } else {
        const data = await response.json();
        setError(data.message || "Error al actualizar el producto.");
      }
    } catch (error) {
      setError('Error al actualizar el producto');
    }
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
        <form onSubmit={handleAddProduct} className="product-form">
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
            placeholder="Descripción"
            className="product-textarea"
            required
            maxLength={200}
            minLength={10}
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder="Precio"
            className="product-input"
            required
            min={0}
            max={1000}
          />
          <button type="submit" className="add-button-product">
            Agregar Producto
          </button>
        </form>

        <div>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>Nombre del producto: {product.name}</h3>
                <span>Descripción: {product.description}</span>
                <span>Categoría: {product.categoryName}</span>
                <span>Precio: ${product.price}</span>
                <div className="button-group">
                  <button onClick={() => handleUpdateProduct(product.id, {
                    name: prompt("Nuevo nombre:", product.name) || product.name,
                    categoryId: prompt("Nuevo ID de categoría:", product.categoryId) || product.categoryId,
                    description: prompt("Nueva descripción:", product.description) || product.description,
                    price: prompt("Nuevo precio:", product.price) || product.price
                  })} className="actualizar-button">
                    Actualizar
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="eliminar-button">
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className='NohayCategorias'>No hay productos disponibles.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;

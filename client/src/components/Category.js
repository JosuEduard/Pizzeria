import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/category.css';

const CategoryManager = () => {
  // 1. Estado
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [newCategory, setNewCategory] = useState(''); // Estado para el nombre de la nueva categoría
  const navigate = useNavigate();

  // 2. Función para obtener categorías
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
    fetchCategories();
  }, [fetchCategories]);

  // 3. Función para agregar categoría
  const handleAddCategory = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    console.log('Valor de newCategory:', newCategory); // Para depurar
    if (!newCategory.trim()) { // Verifica si el nombre de la categoría está vacío
      setError('El nombre de la categoría no puede estar vacío.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/category/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }), // Envía el nombre de la categoría
      });
      if (response.ok) {
        setNewCategory(''); // Limpia el campo de entrada
        fetchCategories(); // Recarga la lista de categorías
      } else {
        const data = await response.json();
        setError(data.message || "Error al agregar la categoría.");
      }
    } catch (error) {
      setError('Error al agregar la categoría');
    }
  };

  // 4. Función para actualizar categoría
  const handleUpdateCategory = async (id, newName) => {
    if (!newName.trim()) {
      setError('El nombre de la categoría no puede estar vacío.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/category/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name: newName }),
      });
      if (response.ok) {
        fetchCategories(); // Recargar la lista después de actualizar
      } else {
        const data = await response.json();
        setError(data.message || "Error al actualizar la categoría.");
      }
    } catch (error) {
      setError('Error al actualizar la categoría');
    }
  };

  // 5. Renderizado
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (categories.length === 0) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Gestión de Categorías</h2>

      <div className="category-content">
        <form onSubmit={handleAddCategory} className="category-form">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)} // Actualiza el estado al escribir
            placeholder="Nombre de la nueva categoría"
            className="category-input"
          />
          <button type="submit" className="add-button">
            Agregar Categoría
          </button>
        </form>

        <div>
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <h3>{category.name}</h3>
              <button onClick={() => handleUpdateCategory(category.id, prompt("Nuevo nombre:", category.name))}>
                Actualizar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
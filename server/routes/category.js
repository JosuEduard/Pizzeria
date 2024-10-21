const { response } = require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();



// Ruta para agregar una nueva categoría a la base de datos
router.post('/add', (req, res, next) => {
  let category = req.body;
  query = "INSERT INTO category (name) VALUES (?)"; // Inserta la nueva categoría en la tabla 'category'
  connection.query(query, [category.name], (err, results) => {
    if (!err) {
      // Si la inserción es exitosa, responde con un mensaje de éxito
      return res.status(200).json({ message: "Se agregó la categoría exitosamente" });
    } else {
      // Si hay un error, devuelve el error con un estado 500
      return res.status(500).json(err);
    }
  });
});

// Ruta para obtener todas las categorías
router.get('/get',  (req, res, next) => {
  var query = "SELECT * FROM category ORDER BY name"; // Selecciona todas las categorías de la tabla
  connection.query(query, (err, results) => {
    if (!err) {
      // Si la consulta es exitosa, responde con los resultados
      return res.status(200).json({ results });
    } else {
      // Si hay un error, devuelve el error con un estado 500
      return res.status(500).json(err);
    }
  });
});

// Ruta para actualizar una categoría existente por su ID
router.patch("/update", (req, res, next) => {
  let product = req.body; 
  var query = "UPDATE category SET name = ? WHERE id = ?"; // Actualiza el nombre de la categoría por su ID
  connection.query(query, [product.name, product.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        // Si no se encuentra el ID de la categoría, devuelve un estado 404
        return res.status(404).json({ message: "No se encontró el ID de la categoría" });
      }
      // Si la actualización es exitosa, responde con un mensaje de éxito
      return res.status(200).json({ message: "Categoría actualizada exitosamente" });
    } else {
      // Si hay un error, devuelve el error con un estado 500
      return res.status(500).json(err);
    }
  });
});

// Ruta para eliminar una categoría por su ID
router.delete('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  const query = "DELETE FROM category WHERE id = ?";
  
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "Categoría no encontrada." });
      }
      return res.status(200).json({ message: "Categoría eliminada exitosamente." });
    } else {
      return res.status(500).json(err);
    }
  });
});



module.exports = router;

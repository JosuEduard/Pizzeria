const express = require('express');
const connection = require('../connection');
const router = express.Router();

// Ruta para agregar un producto
router.post('/add', (req, res) => {
  let product = req.body;
  var query = "INSERT INTO product (name, categoryId, description, price) VALUES (?, ?, ?, ?)";
  connection.query(query, [product.name, product.categoryId, product.description, product.price], (err, results) => {
    if (!err) {
      return res.status(200).json({ message: "Producto agregado correctamente" });
    } else {
      return res.status(500).json(err);
    }
  });
});

// Ruta para obtener todos los productos junto con su categoría asociada
router.get('/get', (req, res, next) => {
  var query = `SELECT p.id, p.name, p.description, p.price, c.id as categoryId, c.name as categoryName FROM product as p INNER JOIN category as c WHERE p.categoryId = c.id`;
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// Ruta para obtener productos por categoría (solo productos activos)
router.get('/getByCategory/:id', (req, res, next) => {
  const id = req.params.id;
  var query = "SELECT id, name FROM product WHERE categoryId = ? AND status = 'true'";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// Ruta para obtener un producto por su ID
router.get('/getById/:id', (req, res, next) => {
  const id = req.params.id;
  var query = "SELECT id, name, description, price FROM product WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});

// Ruta para actualizar un producto (excepto su estado)
router.patch('/update', (req, res, next) => {
  let product = req.body;
  var query = "UPDATE product SET name = ?, categoryId = ?, description = ?, price = ? WHERE id = ?";
  connection.query(query, [product.name, product.categoryId, product.description, product.price, product.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "No se encontró el producto con ese ID" });
      }
      return res.status(200).json({ message: "¡El producto se actualizó correctamente!" });
    } else {
      return res.status(500).json(err);
    }
  });
});

// Ruta para actualizar el estado de un producto
router.patch('/updateStatus', (req, res, next) => {
  let product = req.body;
  var query = "UPDATE product SET status = ? WHERE id = ?";
  connection.query(query, [product.status, product.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "No se encontró el producto con ese ID" });
      }
      return res.status(200).json({ message: "El estado del producto se actualizó correctamente." });
    } else {
      return res.status(500).json(err);
    }
  });
});

router.delete('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  var query = "DELETE FROM product WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "No se encontró el producto con ese ID" });
      }
      return res.status(200).json({ message: "¡El producto se eliminó correctamente!" });
    } else {
      return res.status(500).json(err);
    }
  });
});


module.exports = router;

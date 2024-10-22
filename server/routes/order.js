const { response } = require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();

// Ruta para agregar una nueva orden a la base de datos
router.post('/add', (req, res, next) => {
  let order = req.body;
  const query = "INSERT INTO orders (name, email, contact_number, payment_method, total_amount) VALUES (?, ?, ?, ?, ?)";
  
  connection.query(query, [order.name, order.email, order.contact_number, order.payment_method, order.total_amount], (err, results) => {
    if (!err) {
      // Si la inserción es exitosa, agregar los productos de la orden en 'order_items'
      const orderId = results.insertId;
      const orderItemsQuery = "INSERT INTO order_items (order_id, category, product, price, quantity, total) VALUES ?";
      
      const orderItems = order.products.map(product => [orderId, product.category, product.product, product.price, product.quantity, product.total]);
      
      connection.query(orderItemsQuery, [orderItems], (err, results) => {
        if (!err) {
          return res.status(200).json({ message: "Se agregó la orden exitosamente" });
        } else {
          return res.status(500).json(err);
        }
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

// Ruta para obtener todas las órdenes
router.get('/get', (req, res, next) => {
  const query = "SELECT * FROM orders ORDER BY created_at ASC";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// Ruta para actualizar una orden existente por su ID
router.patch('/update', (req, res, next) => {
  let order = req.body;
  const query = "UPDATE orders SET name = ?, email = ?, contact_number = ?, payment_method = ?, total_amount = ? WHERE id = ?";
  
  connection.query(query, [order.name, order.email, order.contact_number, order.payment_method, order.total_amount, order.id], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "No se encontró el ID de la orden" });
      }
      return res.status(200).json({ message: "Orden actualizada exitosamente" });
    } else {
      return res.status(500).json(err);
    }
  });
});

// Ruta para eliminar una orden por su ID
router.delete('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  const query = "DELETE FROM orders WHERE id = ?";
  
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Orden no encontrada." });
      }
      return res.status(200).json({ message: "Orden eliminada exitosamente." });
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;

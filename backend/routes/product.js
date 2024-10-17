const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {
  let product = req.body;
  var query = "INSERT INTO product (name, categoryId, description, price, status) VALUES (?, ?, ?, ?, 'true')";
  connection.query(query, [product.name, product.categoryId, product.description, product.price], (err, results) => {
    if(!err){
      return res.status(200).json({message : "Producto agregado correctamente"});
    }
    else{
      return res.status(500).json(err);
    }
  });
});

// Trae todos los productos con su categoría asociada.
router.get('/get', auth.authenticateToken, (req, res, next) => {
  var query = `SELECT p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName FROM product as p INNER JOIN category as c WHERE p.categoryId = c.id`;
  connection.query(query, (err, results)=>{
    if(!err){
      return res.status(200).json(results);
    }
    else{
      return res.status(500).json(err);
    }
  })
});

/**
 * Esta petición obtiene todos los productos que pertenecen a una categoría específica,
 * filtrada por el id pasado como parámetro en la URL, y solo devuelve los productos que están activos (es decir, con status = 'true').
 */
router.get('/getByCategory/:id', auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  var query = "SELECT id, name FROM product WHERE categoryId = ? AND status = 'true'";
  connection.query(query, [id], (err, results) => {
    if(!err){
      return res.status(200).json(results);
    }
    else{
      return res.status(500).json(err);
    }
  });
});

// Traer un producto de la base de datos con un id especifico 

router.get('/getById/:id', auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  var query = "SELECT id, name, description, price FROM product WHERE id = ?";
  connection.query(query, [id], (err, results) =>{
    if(!err){
    return res.status(200).json(results[0]);
    }
    else{
      return res.status(500).json(err);
    }
  });
});

// Actualizar un producto de la base de datos pasandole el id y que NO SE PUEDE actualizar el estado de ese producto

router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next)=>{
  let product = req.body;
  var query = "UPDATE product set name =?, categoryId = ?, description = ?, price = ? WHERE id = ?";
  connection.query(query, [product.name, product.categoryId, product.description, product.price, product.id], (err, results) =>{
    if(!err){
      if(results.affectedRows == 0){
        return res.status(404).json({message : "No se encontro el producto con ese ID"});
      }
      return res.status(200).json({message : "¡El producto se actualizo correctamente!"});
    }
    else{
      return res.status(500).json(err);
    }
  });
});


// Actualizar un producto de la base de datos, y que tambien se puede actualizar el estado de ese producto
router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole ,(req, res, next) =>{
  let user = req.body;
  var query = "UPDATE product SET status = ? WHERE id = ? ";
  connection.query(query, [user.status, user.id], (err, results) =>{
    if(!err){
      if(results.affectedRows == 0){
        return res.status(404).json({message : "No se encontro el producto con ese ID"})
      }
      return res.status(200).json({message: "El estado del producto se actualizo correctamente."});
    }
    else{
      return res.status(500).json(err);
    }
  });
});


// Borrar un producto de la base de datos 
router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) =>{
  const id = req.params.id;
  var query = "DELETE FROM product WHERE id = ?";
  connection.query(query, [id], (err, results) =>{
    if(!err){
      if(results.affectedRows == 0){
        return res.status(404).json({message: "No se encontro el producto con ese ID"});
      }
      return res.status(200).json({message : "¡El producto se elimino correctamente!"})
    }
    else{
      return res.status(500).json(err);
    }
  })
});


module.exports = router;
const { response } = require('express');
const express = require('express');
const connection = require('../connection');

const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');



router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {
  let category = req.body;
  query = "INSERT INTO category (name) VALUES (?)";
  connection.query(query, [category.name], (err, results) => {
    if(!err){
      return res.status(200).json({message : "Se agrego la categoría exitosamente"});
    }
    else{
      return res.status(500).json(err)
    }
  });
});

router.get('/get', auth.authenticateToken, (req, res, next) =>{
  var query = "SELECT * FROM category ORDER BY name";
  connection.query(query, (err, results) =>{
    if(!err){
      return res.status(200).json({results})
    }
    else{
      return res.status(500).json(err)
    }
  });
});

router.patch("/update", auth.authenticateToken, checkRole.checkRole, (req, res, next) =>{
  let product = req.body;
  var query = "UPDATE category set name = ? WHERE = ?";
  connection.query(query, [product.name, product.id], (err, results)=>{
    if(!err){
      if(results.affectedRows == 0){
        return res.status(404).json({message: "No se encontro el id de categoria"})
      }
      return res.status(200).json({message: "Categoria actualizada exitosamente"});
    }
    else{
      return res.status(500).json(err);
    }
  })
})

module.exports = router;

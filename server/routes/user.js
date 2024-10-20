const express = require('express');
const connection = require('../connection');  // Importa la conexión a la base de datos
const router = express.Router();  // Crea un router para gestionar las rutas relacionadas con usuarios

// Ruta para registrar un nuevo usuario
router.post('/signup', (req, res) => {
  let user = req.body;  // Obtiene los datos enviados en el cuerpo de la petición

  // Consulta si el correo electrónico ya está registrado
  let query = "SELECT email FROM user WHERE email = ?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        // Si el correo no existe, inserta un nuevo usuario en la base de datos
        query = "INSERT INTO user(name, contactNumber, email, password) VALUES(?, ?, ?, ?)";
        connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, results) => {
          if (!err) {
            return res.status(200).json({ message: "¡Registro exitoso!" });
          } else {
            return res.status(500).json(err);  // Si ocurre un error en la inserción, lo devuelve
          }
        });
      } else {
        return res.status(400).json({ message: "El correo electrónico ya existe" });  // Si el correo ya existe, notifica al usuario
      }
    } else {
      return res.status(500).json(err);  // Si hay error en la consulta inicial, lo devuelve
    }
  });
});

// Ruta para el inicio de sesión
router.post('/login', (req, res) => {
  const user = req.body;  // Recoge los datos del usuario del cuerpo de la petición
  // Consulta para verificar si el email existe en la base de datos
  let query = "SELECT email, password FROM user WHERE email = ?";
  
  // Ejecuta la consulta SQL usando el email del usuario
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0 || results[0].password != user.password) {
        return res.status(401).json({ message: "Nombre o Contraseña incorrecta" });  // Error de autenticación
      } else {
        return res.status(200).json({ message: "Inicio de sesión exitoso" });  // Inicio de sesión exitoso
      }
    } else {
      return res.status(500).json(err);  // Si hubo un error en la consulta SQL
    }
  });
});

module.exports = router;  // Exporta el router para que pueda ser utilizado en otros archivos

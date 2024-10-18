const express = require('express');
const connection = require('../connection');  // Importa la conexión a la base de datos
const router = express.Router();  // Crea un router para gestionar las rutas relacionadas con usuarios

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
require('dotenv').config();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

// Ruta para registrar un nuevo usuario
router.post('/signup', (req, res) => {
  let user = req.body;  // Obtiene los datos enviados en el cuerpo de la petición

  // Consulta si el correo electrónico ya está registrado
  query = "SELECT email, password, role, status FROM user WHERE email = ?"
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        // Si el correo no existe, inserta un nuevo usuario en la base de datos
        query = "INSERT INTO user(name, contactNumber, email, password, status, role) VALUES(?, ?, ?, ?, 'false', 'user')"
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
      return req.status(500).json(err);  // Si hay error en la consulta inicial, lo devuelve
    }
  });
});

// Ruta para el inicio de sesión
router.post('/login', (req, res) => {
  const user = req.body; // Recoge los datos del usuario del cuerpo de la petición
  // Consulta para verificar si el email existe en la base de datos
  query = "SELECT email, password, role, status FROM user WHERE email = ?"
  
  // Ejecuta la consulta SQL usando el email del usuario
  connection.query(query, [user.email], (err, results) => {
    if (!err) { // Si no hay error en la consulta
      // Verifica si no hay resultados o si la contraseña no coincide
      if (results.length <= 0 || results[0].password != user.password) {
        return res.status(401).json({ message: "Nombre o Contraseña incorrecta" }) // Error de autenticación
      }
      // Si el usuario existe pero su cuenta no está aprobada
      else if (results[0].status === 'false') {
        return res.status(401).json({ message: "¡Espera que el administrador apruebe tu solicitud!" })
      }
      // Si las credenciales son correctas
      else if (results[0].password === user.password) {
        const response = { email: results[0].email, role: results[0].role } // Prepara los datos del usuario
        // Genera un token JWT con los datos del usuario, válido por 8 horas
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
        res.status(200).json({ token: accessToken }); // Envía el token como respuesta
      }
      // Si algo más falla
      else {
        return res.status(400).json({ message: "Algo salio mal. Porfavor intenta de nuevo más tarde" })
      }
    }
    // Si hubo un error en la consulta SQL
    else {
      return res.status(500).json(err)
    }
  })
});

// Configuración del servicio de email (Gmail)
var transporter = nodemailer.createTransport({
  service: 'gmail', // Usa Gmail como servicio de correo
  auth: {
    user: process.env.EMAIL, // Email del remitente (usado para enviar)
    pass: process.env.PASSWORD // Contraseña del remitente
  }
});

// Ruta para restablecer la contraseña (olvidada)
router.post('/forgotPassword', (req, res) => {
  const user = req.body; // Recoge los datos del usuario (email) del cuerpo de la petición
  // Consulta para verificar si el email existe en la base de datos
  query = "SELECT email, password FROM user WHERE email = ?";
  
  connection.query(query, [user.email], (err, results) => {
    if(!err) { // Si no hay error en la consulta
      if(results.length <= 0) { 
        // Si no se encuentra el correo, responde que el email fue enviado (para no revelar que el email no existe)
        return res.status(200).json({ message: "Nueva contraseña enviada exitosamente a su correo electrónico." })
      } else {
        // Configura el contenido del correo que se va a enviar
        var mailOptions = {
          from: process.env.EMAIL, // Email del remitente
          to: results[0].email, // Email del destinatario (usuario que olvidó su contraseña)
          subject: 'Contraseña por pizza devs', // Asunto del correo
          // Cuerpo del mensaje en HTML con los datos de inicio de sesión
          html: '<p><b>Sus datos de inicio de sesión para pizza dev</b><br><b>Email:</b>'+results[0].email+'<br><b>Contraseña:</b>'+results[0].password+'<br><a href="http://localhost:3000/">Haz click para loguearte</a></p>'
        };

        // Envía el correo con los datos de inicio de sesión
        transporter.sendMail(mailOptions, function (error, info) {
          if(error){
            console.log(error); // Si hay un error al enviar el correo, se imprime en consola
          } else {
            console.log('Email sent: ' + info.response); // Si se envía correctamente, lo imprime en consola
          }
        });
        
        // Responde que el correo fue enviado
        return res.status(200).json({ message: "Nueva contraseña enviada exitosamente a su correo electrónico." })
      }
    } else {
      return res.status(500).json(err) // Si hay error en la consulta SQL, responde con el error
    }
  })
});

// Ruta para obtener una lista de usuarios con rol 'user'
router.get('/get', auth.authenticateToken, checkRole.checkRole, (req, res) => {
  var query = "SELECT id, name, email, contactNumber, status FROM user WHERE role = 'user'";
  
  // Ejecuta la consulta en la base de datos
  connection.query(query, (err, results) => {
    if (!err) {
      // Devuelve estado 200 con los resultados
      return res.status(200).json(results);
    } else {
      // Devuelve estado 500 en caso de error
      return res.status(500).json(err);
    }
  });
});

// Ruta para actualizar el estado de un usuario
router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res) => {
  let user = req.body; // Obtiene el cuerpo de la solicitud
  var query = "UPDATE user SET status = ? WHERE id = ?";
  
  // Ejecuta la consulta para actualizar el estado del usuario
  connection.query(query, [user.status, user.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        // Devuelve estado 404 si el usuario no existe
        return res.status(404).json({ message: "Este id de usuario no existe" });
      } else {
        // Devuelve estado 200 si la actualización fue exitosa
        return res.status(200).json({ message: "¡Usuario actualizado exitosamente!" });
      }
    } else {
      // Devuelve estado 500 en caso de error
      return res.status(500).json(err);
    }
  });
});

// Ruta para verificar la validez del token
router.get('/checkToken', auth.authenticateToken, (req, res) => {
  // Devuelve estado 200 si el token es válido
  return res.status(200).json({ message: "true" });
});

// Ruta para cambiar la contraseña de un usuario
router.post('/changePassword', auth.authenticateToken, (req, res) => {
  const user = req.body; // Obtiene el cuerpo de la solicitud
  const email = res.locals.email; // Obtiene el correo electrónico del usuario
  var query = "SELECT * FROM user WHERE email = ? AND password = ?";
  
  // Verifica la contraseña antigua
  connection.query(query, [email, user.oldPassword], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        // Devuelve estado 400 si la contraseña antigua es incorrecta
        return res.status(400).json({ message: "La contraseña antigua es incorrecta." });
      } else if (results[0].password == user.oldPassword) {
        // Actualiza la contraseña si la antigua es correcta
        query = "UPDATE user SET password = ? WHERE email = ?";
        connection.query(query, [user.newPassword, email], (err, results) => {
          if (!err) {
            // Devuelve estado 200 si la contraseña se actualizó correctamente
            return res.status(200).json({ message: "La contraseña se actualizó correctamente." });
          } else {
            // Devuelve estado 500 en caso de error
            return res.status(500).json(err);
          }
        });
        return res.status(200); // Este return no se ejecutará debido a la llamada anterior
      } else {
        // Devuelve estado 400 si ocurre un error
        return res.status(400).json({ message: "Algo salió mal, por favor intenta de nuevo más tarde." });
      }
    } else {
      // Devuelve estado 500 en caso de error
      return res.status(500).json(err);
    }
  });
});


module.exports = router;  // Exporta el router para que pueda ser utilizado en otros archivos
const mysql = require('mysql');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

// Configura la conexión a la base de datos usando las variables de entorno (archivo: .env)
let connection = mysql.createConnection({
  port: process.env.DB_PORT, 
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME 
});

// Establece la conexión con la base de datos
connection.connect((err) => {
  if (!err) {
    console.log('Conectada');  // Si no hay error, confirma que la conexión fue exitosa
  } else {
    console.log(err);  // Si hay error, imprime el error en consola
  }
});

module.exports = connection;  // Exporta la conexión para que pueda ser utilizada en otros archivos
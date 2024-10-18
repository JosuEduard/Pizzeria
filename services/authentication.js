
// Carga las variables de entorno desde el archivo .env
require('dotenv').config()

// Importa la librería jsonwebtoken para manejar tokens JWT
const jwt = require('jsonwebtoken')

// Middleware para autenticar un token en las solicitudes
function authenticateToken(req, res, next) {
  
  // Obtiene el token del encabezado de autorización de la solicitud
  const authHeader = req.headers['authorization']
  
  // Separa el token de la palabra 'Bearer' en el encabezado
  const token = authHeader && authHeader.split(' ')[1];

  // Si no hay token, responde con el estado 401 (No autorizado)
  if (token == null) {
    return res.sendStatus(401);
  }
  
  // Verifica la validez del token usando la clave de acceso del archivo .env
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
    
    // Si hay un error (como un token inválido), responde con estado 403 (Prohibido)
    if (err)
      return res.sendStatus(403);
    
    // Si el token es válido, guarda la información del usuario en res.locals
    res.locals = response;
    
    // Llama a la siguiente función middleware
    next();
  });
}

module.exports = { authenticateToken: authenticateToken }
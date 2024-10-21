//configurando el servidor con el puerto de la .env PORT = 8080
PORT = process.env.PORT || 8080;

require('dotenv').config();
const http = require('http');
const app = require('./index');
const server = http.createServer(app);

server.listen(process.env.PORT);
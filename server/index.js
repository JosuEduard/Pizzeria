// Archivo que exporta la aplicación y sus rutas para que pueda ser utilizada por otros archivos
const express = require('express');
let cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const billRoute = require('./routes/bill');
const dashboardRoute = require('./routes/dashboard');
const orderRoute = require('./routes/order');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/bill', billRoute);
app.use('/order', orderRoute);
app.use('/dashboard', dashboardRoute);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product.routes');
const allProducts = require('./routes/allProducts.routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/getAllProducts', allProducts);

module.exports=app;
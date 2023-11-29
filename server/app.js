const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product.routes');
const allProducts = require('./routes/allProducts.routes');
const deleteProduct = require('./routes/deleteProduct.routes');
const cors = require('cors');
const updateProduct = require('./routes/editProduct.routes');
const getOneProduct = require('./routes/getOneProduct.routes');
const getAllProducts = require('./routes/getAllProducts.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/getAllProducts', allProducts);
app.use('/allProducts', getAllProducts);
app.use('/deleteProduct/:shortCode', deleteProduct);
app.use('/updateProduct/:shortCode', updateProduct);
app.use('/getProduct/:shortCode', getOneProduct);

module.exports=app;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createProduct = require('./routes/createProduct.routes');
const allProducts = require('./routes/allProducts.routes');
const deleteProduct = require('./routes/deleteProduct.routes');
const updateProduct = require('./routes/updateProduct.routes');
const getOneProduct = require('./routes/getOneProduct.routes');
const getProductsPerPage = require('./routes/getProductsPerPage.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/createProduct', createProduct);
app.use('/getAllProducts', allProducts);
app.use('/getProductsPerPage', getProductsPerPage);
app.use('/getProduct/:productId', getOneProduct);
app.use('/deleteProduct/:productId', deleteProduct);
app.use('/updateProduct/:productId', updateProduct);

module.exports=app;
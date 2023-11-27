const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const allProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
      }
};

module.exports = allProducts;

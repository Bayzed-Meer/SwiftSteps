const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const productRoutes = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    
    res.status(201).send(savedProduct);
  } catch (err) {
    console.error('Error saving product:', err);
    res.status(500).send('Error saving product');
  }
};

module.exports = productRoutes;

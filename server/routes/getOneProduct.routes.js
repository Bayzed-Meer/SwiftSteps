const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const getOneProduct = async (req, res) => {
  const shortCode = req.params.shortCode;

  try {
    const product = await Product.findOne({ shortCode });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getOneProduct;

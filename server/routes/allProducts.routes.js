const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const allProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (page - 1) * pageSize;
    const products = await Product.find().skip(skip).limit(pageSize);

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
};

module.exports = allProducts;

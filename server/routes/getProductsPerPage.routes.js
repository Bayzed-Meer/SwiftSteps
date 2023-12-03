const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const getProductsPerPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const sortBy = req.query.sortBy || 'createdDate'; // Default sorting by createdDate
    const isAscending = req.query.isAscending === 'true'; // Convert to boolean

    const sortDirection = isAscending ? 1 : -1;
    
    const skip = (page - 1) * pageSize;

    const query = Product.find()
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize);

    const products = await query.exec();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
};

module.exports = getProductsPerPage;

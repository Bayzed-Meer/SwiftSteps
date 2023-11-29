const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const updateProduct = async (req, res) => {
  const shortCodeToUpdate = req.params.shortCode;
  const updatedProductData = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { shortCode: shortCodeToUpdate },
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }

    console.log('Product updated:', updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Error updating product');
  }
};

module.exports = updateProduct;

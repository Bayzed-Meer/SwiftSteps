const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const deleteProduct = async (req, res) => {
    const productIdToDelete = req.params.productId;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productIdToDelete);

        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product');
    }
};

module.exports = deleteProduct;

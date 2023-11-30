const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  shortCode: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  category: {
    type: String,
    required: true,
    enum: ['sports', 'casual', 'running'], 
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 250,
  },
  imageUrl: {
    type: String,
  },
  createdDate: {
    type: Date,
    required: true,
    max: Date.now,
    validate: {
      validator: function (date) {
        return date <= new Date();
      },
      message: 'Created Date should not be after the current date.',
    },
  },
  origin: {
    type: String,
    required: true,
    enum: ['Bangladesh', 'China', 'Vietnam'],
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

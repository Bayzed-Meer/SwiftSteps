const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: 
  { 
    type: String, 
    required: true,
  },
  productShortCode: { 
    type: String, 
    required: true, 
  },
  category: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
  },
  imageUrl: { 
    type: String 
  },
  createdDate: { 
    type: Date, 
    required: true, 
    max: Date.now 
  },
  origin: { 
    type: String, 
    required: true 
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

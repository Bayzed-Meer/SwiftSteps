const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    unique: [true, "Duplicate name not allowed"],
    minlength: [3, "Product name must be at least 3 characters long"],
    maxlength: [50, "Product name cannot exceed 50 characters"],
    trim: true,
  },
  shortCode: {
    type: String,
    required: [true, "Short code is required"],
    unique: [true, "Duplicate code not allowed"],
    minlength: [3, "Short code must be at least 3 characters long"],
    maxlength: [50, "Short code cannot exceed 50 characters"],
    uppercase: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: ["Sports", "Casual", "Running"],
      message: "Category must be Sports, Casual, or Running",
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    validate: {
      validator: function (price) {
        return price > 0;
      },
      message: "Price should be a positive number.",
    },
  },
  description: {
    type: String,
    minlength: [3, "Description must be at least 3 characters long"],
    maxlength: [250, "Description cannot exceed 250 characters"],
    trim: true,
  },
  image: {
    type: String,
  },
  createdDate: {
    type: Date,
    required: [true, "Created date is required"],
    max: Date.now,
    validate: {
      validator: function (date) {
        return date <= new Date();
      },
      message: "Created Date should not be in the future.",
    },
    default: Date.now,
  },
  origin: {
    type: String,
    required: [true, "Origin is required"],
    enum: {
      values: ["Bangladesh", "China", "Vietnam"],
      message: "Origin must be Bangladesh, China, or Vietnam",
    },
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    validate: {
      validator: function (quantity) {
        return Number.isInteger(quantity) && quantity > 0;
      },
      message: "Quantity should be a positive integer.",
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

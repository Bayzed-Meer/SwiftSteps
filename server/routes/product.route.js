const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/product.controller");

// Multer storage configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const { productName, shortCode } = req.body;
    const baseName = `${productName}-${shortCode}`;
    const ext = path.extname(file.originalname);
    const fileName = `${baseName}${ext}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/getAllProducts", productController.getAllProducts);
router.post(
  "/createProduct",
  upload.single("image"),
  productController.createProduct
);
router.get("/getProduct/:id", productController.getOneProduct);
router.put(
  "/updateProduct/:id",
  upload.single("image"),
  productController.updateProduct
);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.get("/getProductsPerPage", productController.getProductsPerPage);

module.exports = router;

const express = require("express");
const routes = express.Router();

const {verifyToken, verifyRole} = require("../middleware/verifyToken");
const uploadImage = require("../middleware/uploadImage");
const { addProduct, getAllProducts, updateProduct, deleteProduct, getProductByCategory, getProductBySubCategory, getProduct } = require("../controller/product.controller");

routes.post("/add-product", verifyToken, uploadImage.array("productImages"), addProduct);

routes.get("/all-products", getAllProducts);

// Get One Product by Category And SubCategory
routes.get("/products", getProduct);

routes.put("/update-product/:id", verifyToken, uploadImage.array("productImages"), updateProduct);

routes.delete("/delete-product/:id", verifyToken, verifyRole("admin"), deleteProduct);

module.exports = routes;
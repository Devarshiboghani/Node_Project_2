const express = require('express');
const routes = express.Router();
 
const {verifyToken, verifyRole} = require('../middleware/verifyToken');
const { addCategory, getAllCategories, updateCategory, deleteCategory, getSingleCategory } = require('../controller/category.controller');
const uploadImage = require('../middleware/uploadImage');

routes.post("/add-category", verifyToken, verifyRole("admin"), uploadImage.single('categoryImage'), addCategory);

routes.get("/get-categories", verifyToken, getAllCategories);

routes.get("/single-category/:id", verifyToken, getSingleCategory);

routes.put("/update-category/:id", verifyToken, verifyRole("admin"), uploadImage.single('categoryImage'), updateCategory);

routes.delete("/delete-category/:id", verifyToken, verifyRole("admin"), deleteCategory);

module.exports = routes;
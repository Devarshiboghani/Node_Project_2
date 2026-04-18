const express = require('express');
const routes = express.Router();

const {verifyToken} = require('../middleware/verifyToken');
const { addSubCategory, getAllSubCategories, updateSubCategory, deleteSubCategory, getSubCategoryByCategory } = require('../controller/subcategory.controller');

routes.post("/add-subcategory", verifyToken, addSubCategory);

routes.get("/all-subcategories", getAllSubCategories);

routes.get("/subcategory-by-category/:categoryId", getSubCategoryByCategory);

routes.put("/update-subcategory/:id", verifyToken, updateSubCategory);

routes.delete("/delete-subcategory/:id", verifyToken, deleteSubCategory);

module.exports = routes;
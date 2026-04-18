const express = require('express');
const routes = express.Router();

const uploadImage = require('../middleware/uploadImage');
const {registerValidation, loginValidation} = require('../middleware/validationUser');
const { registerUser, loginUser } = require("../controller/user.controller");
const { verifyToken } = require('../middleware/verifyToken');

routes.use("/user", require("./user.routes"));


routes.use("/category", require("./category.routes"));

routes.use("/subcategory", require("./subCategory.routes"));

routes.use("/product", require("./product.routes"));

routes.use("/carts", require("./cart.routes"));

routes.use("/wishlist", require("./wishlist.routes"));


// Add User
routes.post("/register", uploadImage.single('profileImage'), registerValidation, registerUser);

routes.post("/login", loginValidation, loginUser);

module.exports = routes;
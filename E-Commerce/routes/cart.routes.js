const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { addToCart, getAllCarts, removeCart } = require("../controller/cart.controller");

const routes = express.Router();

routes.post("/add-cart", verifyToken, addToCart);

routes.get("/get-cart", verifyToken, getAllCarts);

routes.put("/remove-cart", verifyToken, removeCart);

module.exports = routes;
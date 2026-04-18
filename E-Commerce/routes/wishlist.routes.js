const express = require("express");
const routes = require("./cart.routes");
const { verifyToken } = require("../middleware/verifyToken");
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controller/wishlist.controller");

routes.post("/add-wishlist", verifyToken, addToWishlist);

routes.get("/get-wishlist", verifyToken, getWishlist);

routes.put("/remove-wishlist", verifyToken, removeFromWishlist);

module.exports = routes;
const express = require('express');
const { registerUser, loginUser, getProfile, logoutUser } = require('../controller/auth.controller');
const { registerValidation, loginValidation, validate } = require('../middleware/validation.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const routes = express.Router();

routes.post("/register", registerValidation,  registerUser);

routes.post("/login", loginValidation, validate, loginUser);

routes.post("/logout", authMiddleware, logoutUser)

routes.get("/profile", authMiddleware, getProfile);

module.exports = routes;
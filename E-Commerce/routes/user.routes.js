const express = require('express');
const routes = express.Router();

const { getAllUsers, getProfile, updateProfile, deleteProfile } = require('../controller/user.controller');
const {verifyToken} = require('../middleware/verifyToken');
const uploadImage = require("../middleware/uploadImage");


routes.get("/all-users", verifyToken, getAllUsers);

routes.get("/profile", verifyToken, getProfile);

routes.put("/update-profile", verifyToken, uploadImage.single("profileImage"), updateProfile);

routes.delete("/delete-profile", verifyToken, deleteProfile);


module.exports = routes;
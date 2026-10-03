const express = require('express');
const routes = express.Router();
const { getAllUsers, getSingleUser, addNewUser, updateUser, deleteUser } = require("../controller/user.controller.js");
const uploadImage = require("../middleware/imageUpload.js");

// http://localhost:4000/
routes.get("/get-users", getAllUsers);

routes.get("/single-user/:id", getSingleUser);

routes.post("/add-user", uploadImage.single('profileImage'), addNewUser);

routes.put("/update-user/:id", uploadImage.single('profileImage'), updateUser);

routes.delete("/delete-user/:id", deleteUser);



module.exports = routes;
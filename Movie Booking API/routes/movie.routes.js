const express = require("express");
const { addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } = require("../controller/movie.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const uploadImage = require("../middleware/upload.middleware");
const routes = express.Router();

routes.post("/add-movie", authMiddleware, uploadImage.single("posterImage"), addMovie);

routes.get("/", getAllMovies);

routes.get("/:id", getMovieById);

routes.put("/:id", authMiddleware, uploadImage.single("posterImage"), updateMovie);

routes.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMovie);

module.exports = routes;
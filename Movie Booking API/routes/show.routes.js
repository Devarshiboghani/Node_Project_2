const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const { createShow, getAllShows, getShowsByMovie, getShowById, updateShow, deleteShow } = require("../controller/show.controller");
const routes = express.Router();

routes.post("/create-show", authMiddleware, roleMiddleware("admin"), createShow);

routes.get("/", getAllShows);

routes.get("/movie/:movieId", getShowsByMovie);

routes.get("/:id", getShowById);

routes.put("/:id", authMiddleware, roleMiddleware("admin"), updateShow);

routes.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteShow);

module.exports = routes;
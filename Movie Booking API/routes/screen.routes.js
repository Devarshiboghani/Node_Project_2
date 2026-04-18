const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const { createScreen, getAllScreens, getScreenById, updateScreen, deleteScreen } = require("../controller/screen.controller");
const routes = express.Router();

routes.post("/add", authMiddleware, roleMiddleware("admin"), createScreen);

routes.get("/", getAllScreens);

routes.get("/:id", getScreenById);

routes.put("/:id", authMiddleware, roleMiddleware("admin"), updateScreen);

routes.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteScreen);

module.exports = routes;
const express = require('express');
const routes = express.Router();

routes.use("/auth", require("./auth.routes"));

routes.use("/movies", require("./movie.routes"));

routes.use("/screens", require("./screen.routes"));

routes.use("/shows", require("./show.routes"));

routes.use("/booking", require("./booking.routes"));

module.exports = routes;
const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createBooking, getUserBookings, cancelBooking } = require("../controller/booking.controller");
const routes = express.Router();

routes.post("/book", authMiddleware, createBooking);

routes.get("/my-bookings", authMiddleware, getUserBookings);

routes.put("/cancel/:id", authMiddleware, cancelBooking);

module.exports = routes;
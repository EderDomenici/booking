const express = require("express");
const bookingController = require("../controller/bookingController");

const routes = express.Router();

routes.get('/index', bookingController.getBookings)

routes.post('/create', bookingController.createBooking)

routes.put('/updating', bookingController.updatingBooking)

module.exports = routes

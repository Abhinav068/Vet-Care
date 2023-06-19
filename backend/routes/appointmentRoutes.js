const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Route for booking a new appointment
router.post('/book-appointment', appointmentController.bookAppointment);

module.exports = {router};

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

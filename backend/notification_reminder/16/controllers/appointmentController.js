const nodemailer = require('nodemailer');
const { scheduleReminder } = require('./reminderController');
const Appointment = require('../models/appointment');

require('dotenv').config();


// Handle booking a new appointment
exports.bookAppointment = async (req, res) => {
  const { email, dateTime } = req.body;

  try {
    // Create a new appointment in the database
    const appointment = new Appointment({ email, dateTime });
    await appointment.save();
    // res.send("done appointment")

    // Send the booking confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Confirmation of Your Appointment',
      text: 'Your appointment by Vetcare has been successfully booked. Thank you!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending confirmation email:', error);
        // res.send("done mail")
        // TODO: Handle error response
      } else {
        console.log('Confirmation email sent:', info.response);
        // res.send("done mail")
      }
    });

    // Schedule the reminder
    scheduleReminder({ email, dateTime });

    res.sendStatus(200);
    console.log("all okay")
  } catch (error) {
    console.log('Error booking appointment:', error);
    // res.send("error in appointment book")
    // TODO: Handle error response
  }
};

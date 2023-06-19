const nodemailer = require('nodemailer');
// ******************************************************************************************************************************************

const { scheduleReminder } = require('./reminderController');

// ******************************************************************************************************************************************

const Appointment = require('../model/appointment');

require('dotenv').config();


// Handle booking a new appointment
exports.bookAppointment = async (req, res) => {
  const { email, dateTime } = req.body;

  try {
    // Create a new appointment in the database
    const appointment = new Appointment({ email, dateTime });
   


// ******************************************************************************************************************************************



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
      text: 'We are pleased to inform you that your appointment from Vetcare has been successfully booked. We look forward to providing the best possible care for your beloved pet.Thank you for choosing our service for your pets healthcare needs. Our team of dedicated veterinarians and staff members is committed to providing compassionate and comprehensive care to your furry friend. We look forward to seeing you and your pet soon. In the event that you need to reschedule or cancel your appointment, we kindly request that you contact our clinic at least 24 hours in advance, as this will allow us to offer the time slot to another pet owner in need. Thank you!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending confirmation email:', error);
        // res.send("done mail")
        
      } else {
        console.log('Confirmation email sent:', info.response);
        // res.send("done mail")
      }
    });

    // Schedule the reminder
    scheduleReminder({ email, dateTime });

    // res.sendStatus(200);
    console.log("all okay")














// ******************************************************************************************************************************************












  } catch (error) {
    console.log('Error booking appointment:', error);
    // res.send("error in appointment book")
    // TODO: Handle error response
  }
};

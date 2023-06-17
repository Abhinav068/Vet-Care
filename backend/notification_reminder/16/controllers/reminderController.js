const nodemailer = require('nodemailer');
const cron = require('node-cron');

const sendReminderEmail = (appointment) => {
  const { email,dateTime } = appointment;

  // Create a transporter for sending reminder emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
  });

  const mailOptions = {
    from:process.env.EMAIL,
    to: email,
    subject: 'Reminder: Your Upcoming Appointment',
    text: 'This is a reminder from Vetcare for your upcoming appointment which is shedule in 2 hours. Please be prepared.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending reminder email:', error);
    } else {
      console.log('Reminder email sent:', info.response);
    }
  });
};

const scheduleReminder = (appointment) => {
    // Get the appointment dateTime
    const { dateTime } = appointment;
  
    // Calculate the reminder time (2 hours before the appointment)
    const reminderDateTime = new Date(dateTime);
    reminderDateTime.setHours(reminderDateTime.getHours() - 2);
  
    // Convert reminderDateTime to a cron pattern string
    const cronPattern = `${reminderDateTime.getUTCMinutes()} ${reminderDateTime.getUTCHours()} ${reminderDateTime.getUTCDate()} ${reminderDateTime.getUTCMonth() + 1} *`;
  
    // Schedule the reminder using node-cron
    cron.schedule(
      cronPattern,
      () => {
        sendReminderEmail(appointment);
      },
      {
        scheduled: true,
        timezone: 'Asia/Kolkata' 
      }
    );
  };
  
  module.exports = {
    scheduleReminder
  };
  








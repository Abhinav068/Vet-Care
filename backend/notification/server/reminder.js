// Reminder.js

// Function to send the reminder email
const sendReminderEmail = async (email) => {
    // Add your code here to send the reminder email
  };
  
  // Function to schedule the reminder
  const scheduleReminder = (appointment) => {
    const reminderTime = new Date(appointment.dateTime);
    reminderTime.setHours(reminderTime.getHours() - 2);
  
    const currentTime = new Date();
    if (reminderTime > currentTime) {
      const timeDifference = reminderTime - currentTime;
      setTimeout(() => {
        sendReminderEmail(appointment.email);
      }, timeDifference);
    }
  };
  
  export default scheduleReminder;
  
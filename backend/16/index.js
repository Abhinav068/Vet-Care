const express = require('express');
const app = express();
const port = 4000; 

app.get("/",(req,res)=>{
    res.send("Hello World");
})

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://krunalgurao1:krunalgurao@vetcare.i2366lh.mongodb.net/user?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

// Middleware to parse JSON data
app.use(express.json());

// Import appointment routes
const appointmentRoutes = require('./routes/appointmentRoutes');

// Use appointment routes
app.use('/appointments', appointmentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

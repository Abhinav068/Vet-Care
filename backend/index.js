const express = require("express");
const { connection } = require('./db');
const session = require('express-session');
const cors = require("cors");
require("dotenv").config();
const { userRouter } = require("./routes/user.router");
const { bookrouter } = require("./routes/booking.router");
const { adminrouter } = require("./routes/admin.router");
const passport = require("passport");
require("./config/google_oauth")


const app = express();
app.use(express.json());
app.use(cors());





app.use("/user", userRouter);
app.use("/book", bookrouter);
app.use("/admin", adminrouter);


//**************************************************(google)******************************************** */


app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/signup', session: false }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://127.0.0.1:5503/frontend/index.html");
    // console.log(req.user);
    // res.send('Working fine ');
  });



//******************************************************************************************************** */




app.listen(process.env.PORT || 4900, async () => {
  try {
    await connection;

    console.log("*****************Connected to DB*****************");
  } catch (error) {
    console.log("Error in DB", error);
  }
});

// Bhavika's code
// const appointmentRoutes = require('./routes/appointmentRoutes');
const { router } = require("./routes/appointmentRoutes");

// Use appointment routes
app.use('/appointments', router);


// ***************************************************************************************

// PORT = 4900
// mongoURL= mongodb+srv://krunalgurao1:krunalgurao@vetcare.i2366lh.mongodb.net/user?retryWrites=true&w=majority
// key= krunal
// Client_ID= 431668350322-lu2lh6cec85f2daelpqas571lkaldra5.apps.googleusercontent.com
// Client_secret = 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

//******************************************************************************************* */
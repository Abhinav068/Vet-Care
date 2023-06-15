const express = require("express");
const { connection } = require('./db');
const cors = require("cors");
require("dotenv").config();
const { userRouter } = require("./routes/user.router");
const { bookrouter } = require("./routes/booking.router");
const { adminrouter } = require("./routes/admin.router");



const app = express();
app.use(express.json());
app.use(cors());





app.use("/user", userRouter);
app.use("/book", bookrouter);
app.use("/admin", adminrouter);


app.listen(process.env.PORT || 4900, async () => {
  try {
    await connection;

    console.log("*****************Connected to DB*****************");
  } catch (error) {
    console.log("Error in DB", error);
  }
});




// ***************************************************************************************

// PORT = 4900
// mongoURL= mongodb+srv://krunalgurao1:krunalgurao@vetcare.i2366lh.mongodb.net/user?retryWrites=true&w=majority

//******************************************************************************************* */
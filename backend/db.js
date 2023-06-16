const mongoose=require("mongoose")
require("dotenv").config()


const connection=mongoose.connect(process.env.mongoURL ||"mongodb+srv://krunalgurao1:krunalgurao@vetcare.i2366lh.mongodb.net/user?retryWrites=true&w=majority")

module.exports={connection}
const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");





userRouter.get("/", async (req, res) => {
  res.send({ msg: "Home Page" });
});


//*********************************************************************************************************** */



userRouter.post("/emailVerify", async (req, res) => {
  let {email} = req.body;
  const isPresent = await UserModel.findOne({ email });
  if (isPresent) {
    return res.status(500).send({
      msg: "You are already registered. Please login!",
    });
  }  


  otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abhinav28897@gmail.com",
      pass: "gnfkdvgqpnvuqwny",
    },
  });

  const mailOptions = {
    from: "abhinav28897@gmail.com",
    to: email,
    subject: "Here is your OTP for VetCare Login",
    html: `  <!DOCTYPE html>
        <html>
          <head>
            <title>Example Email Template</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5; color: #333; padding: 20px;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border-collapse: collapse;">
              <tr>
                <td style="background-color: #0077c0; text-align: center; padding: 10px;">
                  <h1 style="font-size: 28px; color: #fff; margin: 0;">VetCare</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <h2 style="font-size: 24px; color: #0077c0; margin-top: 0;">OTP for VetCare Login : ${otp}</h2>
                  <p style="margin-bottom: 20px;">Thank you for choosing VetCare Services</p>
                  <p style="margin-bottom: 0;">Best regards,</p>
                  <p style="margin-bottom: 20px;">VetCare</p>
                </td>
              </tr>
            </table>
          </body>
        </html>`,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log(info.response);
      res.send({ msg: "Mail has been Send", otp, email });
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});


//***************************************(REGISTRATION)********************************************** */


userRouter.post("/signup", async (req, res) => {
  let { first_name, last_name, email, mobile, password } = req.body;
  const isPresent = await UserModel.findOne({ email });
  if (isPresent) {
    return res.status(500).send({
      msg: "User already registered",
    });
  }
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(500).send({ msg: "Error" });
      } else {
        const user = new UserModel({
          first_name,
          last_name,
          email,
          mobile,
          password: hash,
        });
        await user.save();
        res.status(201).send({ msg: " Signup Successfull" });
      }
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error",
    });
  }
});



//**********************************************(LOGIN)********************************************* */




userRouter.post("/signin", async (req, res) => {
  let { payload, password } = req.body;
  try {
    let userEmail = await UserModel.findOne({ email: payload });
    if (!userEmail) {
      let userMobile = await UserModel.findOne({ mobile: payload });
      if (!userMobile) {
        return res.status(500).send({ msg: "User not Found" });
      } else {
        bcrypt.compare(password, userMobile.password).then(function (result) {
          if (result) {
            const token = jwt.sign(
              { userID: userMobile._id, email: userMobile.email },
              "masai"
            );
            res.send({
              message: "Login Successful",
              token,
              name: userMobile.first_name,
              last_name: userMobile.last_name,
              email: userMobile.email,
              mobile: userMobile.mobile,
            });
          } else {
            res.status(500).send({ mag: "Wrong Password" });
          }
        });
      }
    } else {
      bcrypt.compare(password, userEmail.password).then(function (result) {
        if (result) {
          const token = jwt.sign(
            { userID: userEmail._id, email: userEmail.email },
            "masai"
          );
          res.send({
            message: "Success",
            token,
            name: userEmail.first_name,
            last_name: userEmail.last_name,
            email: userEmail.email,
            mobile: userEmail.mobile,
          });
        } else {
          res.status(500).send({ mag: "Wrong Password" });
        }
      });
    }
  } catch (e) {
    res.send({ msg: "Error in Login" });
  }
});





//*************************************************************************************************** */


userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(500).send({ msg: "No Token in Headers" });
  }
  try {
    await client.LPUSH("token", token);
    res.status(200).send({ msg: "You are Logged out" });
  } catch (error) {
    return res.status(500).send({ msg: "Error" });
  }
});

userRouter.get("/allusers", async (req, res) => {
  try {
    let users= await UserModel.find();
    res.status(200).send({users})
  } catch (error) {
    res.status(404).send({error})
  }
});




module.exports = {
  userRouter,
};
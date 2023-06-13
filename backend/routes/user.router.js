const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
require("dotenv").config();

userRouter.get("/", async (req, res) => {
  res.send({ msg: "Home Page" });
});


module.exports = {
  userRouter,
};
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport= require("passport")
require("dotenv").config();




passport.use(new GoogleStrategy({
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_secret,
    callbackURL: "http://localhost:4900/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb(null, profile)
  }
));
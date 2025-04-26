const passport = require('passport');
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20');


passport.use(
  new GoogleStrategy ({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : "http://localhost:3000/auth/google/callback"
  },(accessToken , refreshToken , profile,done) => {
      console.log('Google profile:', profile);
      return done(null, profile);
  })
)

passport.serializeUser((user,done)=>{
  done(null , user.id)
})

passport.deserializeUser((id,done)=>{
  done(null , id)
})



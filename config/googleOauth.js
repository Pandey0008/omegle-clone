const passport = require('passport');
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20');

const isProduction = process.env.NODE_ENV === 'production';

const CLIENT_URL = isProduction
  ? "https://omegle-clone-gq94.onrender.com"
  : process.env.BASE_URL;

const GOOGLE_CALLBACK_URL = `${CLIENT_URL}/auth/google/callback`;


passport.use(
  new GoogleStrategy ({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : GOOGLE_CALLBACK_URL
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



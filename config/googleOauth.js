const passport = require('passport');
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20');


passport.use(
  new GoogleStrategy ({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
<<<<<<< HEAD
    callbackURL : process.env.GOOGLE_CALLBACK_URL
=======
    callbackURL : "http://localhost:3000/auth/google/callback"
>>>>>>> 3f8818e96dc400d52041b267b3de8d4e1d1fa80e
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



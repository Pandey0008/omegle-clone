const express = require('express');
const router = express.Router();
const {googleOauth} = require('../controllers/authController');
const passport = require('passport');

router.get('/google',passport.authenticate('google',{scope : ['profile','email']}))



router.get('/google/callback' ,(req, res) => {
    res.render('index');
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


// router.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });
module.exports = router;

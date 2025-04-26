const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const User = require('../models/user');
require('dotenv').config();  // npm install dotenv


// router.get("/", function (req, res) {
//   res.render("index");
// });


router.get('/', (req, res) => {
  res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

router.get("/chat", function (req, res) {
  res.render("chat");
});


// Register POST
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.redirect('/');
  } catch (err) {
      res.send('Error registering user');
  }
});

// Login POST
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send('Invalid Credentials');

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.render('index');
});


module.exports = router;

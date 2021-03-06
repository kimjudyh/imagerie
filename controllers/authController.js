// ======== IMPORTS
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// ======== MODELS
const db = require('../models');

// ======== ROUTES
// GET register new User
router.get('/register', (req, res) => {
  res.render('auth/register', {
    title: 'Registration',
  });
});

// POST create new User
router.post('/register', async (req, res) => {
  try {
  // check if user already exists in db
    const user = await db.User.findOne({username: req.body.username});
    if (user) {
      // user comes back as truthy, account exists
      return res.render('auth/login', {
        error: 'Account already exists, please login',
        title: 'Login',
      });
    }

    // check password match
    if (req.body.password !== req.body.password2) {
      return res.render('auth/register', {
        title: 'Register',
        error: 'Passwords do not match',
      });
    }
    // check password length
    if(req.body.password.length < 3){
      return res.render('auth/register', {
        title: 'Register',
        error: 'Password should be at least 4 characters',
      });
    }

    // generate salt (adds complication to our password hash)
    const salt = bcrypt.genSaltSync(10);
    // hash password- takes 2 params: password to hash, salt
    const hash = bcrypt.hashSync(req.body.password, salt);
    // creating an object with username, email, hashed password
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
    };
   
    // else, create user in database
    const newUser = await db.User.create(userData);
    // then, redirect to login page
    res.redirect('/auth/login');

  } catch (err) {
    // if email already exists
    if(err.keyPattern.email){
      res.render('auth/register', {
        title: 'Register',
        error: 'Email already used'
      })

    }
  }
});

// GET new login
router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Login',
  });
});

// POST create new session
router.post('/login', async (req, res) => {
  try {
  // check for existing user account
  const user = await db.User.findOne({username: req.body.username});

  // user doesn't exist
  if (!user) {
    // send back to login page
    return res.render('auth/login', {
      title: 'Login',
      error: 'Invalid Credentials',
    })
  }

  // verify found user and password sent from login matches db 
  const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordsMatch) {
    // wrong password, send back to login page
    return res.render('auth/login', {
      title: 'Login',
      error: 'Invalid Credentials',
    });
  }
  // if passwords match, create new session, redirect to profile page
  // attach currentUser property to cookie
  req.session.currentUser = user._id;

  // redirect user to albums view
  res.redirect('/albums');

  } catch (err) {
    res.send(err);
  }
});

// GET logout destroy session
router.get('/logout', async (req, res) => {
  // first check if user is logged in
  try {
    await req.session.destroy();
    res.redirect('/auth/login');

  } catch (err) {
    res.send(err);
  }
});

// ======== EXPORTS
module.exports = router;
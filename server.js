// ======= IMPORTS
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

// ======= VIEW ENGINE
app.set('view engine', 'ejs');

// ======= CONTROLLERS
const authController = require('./controllers/authController');

// ======= MIDDLEWARE

// ======= ROUTES
app.get('/', (req, res) => {
  res.send('<h1>Photo Gallery Homepage</h1>')
})

// Auth/User routes
app.use('/auth', authController);

// Album routes

// Photo Routes

// ======= SERVER LISTENER
app.listen(port, () => {
  console.log('Server running on port', port);
})
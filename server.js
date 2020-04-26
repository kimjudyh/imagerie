// ======= IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 4000;

// ======= VIEW ENGINE
app.set('view engine', 'ejs');

// ======= CONTROLLERS
const authController = require('./controllers/authController');

// ======= MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
// TODO sett up session
app.use(session({
  secret: 'xo4SO*U#;ljxliha987DKJEI',
  resave: false, // only save session if set or mutate property on session object
  saveUninitialized: false, // only save a cookie when we set a property
}));

// ======= ROUTES
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Homepage',
  });
})

// Auth/User routes
app.use('/auth', authController);

// Album routes

// Photo Routes

// ======= SERVER LISTENER
app.listen(port, () => {
  console.log('Server running on port', port);
})
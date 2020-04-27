// ======== IMPORTS
const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/project-one';
const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// ======== CONNECT
mongoose.connect(connectionString, configOptions)
  .then(() => {
    console.log('Connected to mongoDB at project-one db');
  })
  .catch((err) => {
    console.log(err);
  })

// ======== EXPORTS
module.exports = {
  User: require('./User'),
  Album: require('./Album'),
  Photo: require('./Photo'),
};
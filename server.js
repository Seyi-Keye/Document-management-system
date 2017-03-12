/* eslint-disable no-console */
// import Routes from './server/routes/index';
// import Routes from './server/routes/route'
// const router = require('./server/routes/route');

const router = require('./server/routes/routes');

const express = require('express');
const logger = require ('morgan');
const bodyParser = require('body-parser');

// setup the app
const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

// Log entry data (https://github.com/expressjs/morgan)
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log('\nApplication is running on port ', port);
});

module.exports = app;








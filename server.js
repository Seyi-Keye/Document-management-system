/* eslint-disable no-console */
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import router from './server/routes/routes';

// setup the app
const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

// Log entry data (https://github.com/expressjs/morgan)
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.use(express.static('./client/public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/client/index.html');
// });

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname + '/client/index.html'));
})

app.listen(port, () => {
  console.log('\nApplication is running on port ', port);
});

export default app;








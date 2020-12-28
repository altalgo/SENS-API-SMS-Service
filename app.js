const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const apiRouter = require('./router/api');

dotenv.config();

const app = express();
app.set('port', 2323);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Main Page');
});
app.use('/api', apiRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
});

const server = app.listen(app.get('port'), () => {
  console.log('Listening to PORT', app.get('port'));
  console.log('http://localhost:4000');
});

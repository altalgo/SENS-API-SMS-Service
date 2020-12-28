const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const apiRouter = require('./router/api.js');
var static = require('serve-static');
dotenv.config();

const app = express();
app.set('port', 2323);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/views', static(path.join(__dirname, '/views')));
app.use('/main', (req, res) => {
  res.render('ejs/main.ejs');
});
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
});

app.get('/', (req, res) => {
  res.send('Main Page');
});

const server = app.listen(app.get('port'), () => {
  console.log('Listening to PORT', app.get('port'));
  console.log('http://localhost:2323');
});

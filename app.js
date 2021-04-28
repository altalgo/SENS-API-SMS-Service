const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const server = app.listen(2323, () => {
  console.log('server has started');
});
app.set('port', 2323);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/views', express.static(path.join(__dirname, '/views')));

const session = require('express-session');
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// 모든 template에서 session 사용하게 해줌.
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

const apiRouter = require('./router/api.js');
const userRouter = require('./router/login');

// 로그인 처리 ROUTER
app.use('/user', userRouter);
// 문자 보내기 ROUTER
app.use('/api', apiRouter);

// 메인 페이지 ROUTER
app.use('/main', (req, res) => {
  if (req.session.user) {
    res.render('ejs/main.ejs');
  } else {
    res.redirect('/');
  }
});

// 들어오면 일단 여기부터
app.get('/', (req, res) => {
  if (req.session.user) res.redirect('/main');
  else {
    res.redirect('/user/login');
  }
});

// ERROR 처리 ROUTER
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;

  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
});

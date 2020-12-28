const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const apiRouter = require('./router/api.js');
const static = require('serve-static');
dotenv.config();

const app = express();
app.set('port', 2323);
//세션관리
const session = require('express-session');
app.use(
  session({
    secret: 'anjdlqfurgkwl?',
    resave: false,
    saveUninitialized: true,
  })
);

// 모든 template에서 session 사용하게 해줌.
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/views', static(path.join(__dirname, '/views')));
app.use('/main', (req, res) => {
  if (req.session.user) {
    res.render('ejs/main.ejs');
  } else {
    res.redirect('/');
  }
});
// 로그인처리
app.use('/login', (req, res) => {
  //admin //
  res.render('ejs/login.ejs');
});
// 로그아웃처리
app.use('/logout', (req, res) => {
  delete req.session.user;
  res.redirect('/');
});
app.post('/chkuser', (req, res) => {
  if (!req.body) res.redirect('/');
  else {
    //유저가 리스트에 있으면
    if (
      req.body.id == process.env.LOGIN_ID &&
      req.body.pw == process.env.LOGIN_PW
    ) {
      req.session.user = {};
      req.session.user.id = req.body.id;
      req.session.user.pw = req.body.pw;
      req.session.save(() => {
        res.redirect('/main');
      });
    } else {
      res.redirect('/');
    }
  }
});
// 들어오면 일단 여기부터
app.get('/', (req, res) => {
  if (req.session.user) res.redirect('/main');
  else {
    res.redirect('/login');
  }
});

// 문자 보내기 ROUTER
app.use('/api', apiRouter);
// 없는 라우터
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
});

// 서버실행
const server = app.listen(app.get('port'), () => {
  console.log('Listening to PORT', app.get('port'));
  console.log('http://localhost:2323');
});

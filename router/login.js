const express = require('express');
const router = express.Router();

// 로그인처리
router.use('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/main');
    } else {
        //admin //
        res.render('ejs/login.ejs');
    }
});

// 로그아웃처리
router.use('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

// 유저 ID && PW 확인
router.post('/chkuser', (req, res) => {
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

module.exports = router;

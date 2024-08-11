const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utilities/wrapAsync');
const User = require('../models/user');
const passport = require('passport')
const { storeReturnTo, validateUser } = require('../utilities/middleware')
const users = require('../controllers/users')


router.route('/register')
    .get(users.renderRegister)
    .post(validateUser, wrapAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo,
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        wrapAsync(users.login)
    )

router.route('/logout')
    .get(users.logout)

module.exports = router;
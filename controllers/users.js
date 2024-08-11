const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utilities/wrapAsync');
const User = require('../models/user');
const passport = require('passport')
const { storeReturnTo, validateUser } = require('../utilities/middleware')

module.exports.renderRegister = (req, res) => {
    res.render('users/register.ejs')
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login.ejs')
}

module.exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body
        const user = new User({ username, email })
        const newUser = await User.register(user, password)
        req.login(newUser, function cb(err) {   // Cb function that will do after login, has 2 arguments error (if any), user object
            if (err) {
                return next(err)
            }
            req.flash('success', 'Register successfully')
            res.redirect('/campgrounds')
        })
    } catch (err) {   // Error object thrown by Passport-Local Mongoose
        req.flash('error', err.message)
        res.redirect('/register')
    }
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Login success')
    const returnToURL = res.locals.returnTo || '/campgrounds'
    res.redirect(returnToURL) 
}

module.exports.logout = (req, res) => {
    req.logout(function cb(err) {   // Method form express-session and passport
        if (err) {
            return next(err)
        }
        req.flash('success', 'Goodbye')
        res.redirect('/campgrounds')
    })
}
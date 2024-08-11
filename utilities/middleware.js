const Campground = require('../models/campground')
const Review = require('../models/review')
const AppError = require('./appError');
const { Campschema, Reviewschema, Userschema } = require('../validateSchema'); 

function storeReturnTo(req, res, next) {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo
        delete req.session.returnTo;
    }
    next()
}

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl.split('?')[0];
        req.flash('error', 'You need to log in')
        return res.redirect('/login')
    }
    return next()
}

async function isAuthCamp(req, res, next) {
    const { id } = req.params
    const camp = await Campground.findById(id).populate('author')
    if (!(req.user && req.user._id.equals(camp.author._id))) {
        req.flash('error', "You don't have permission")
        return res.redirect('/login')
    }
    return next()
}

async function isAuthReview(req, res, next) {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId).populate('author')
    if (!(req.user && req.user._id.equals(review.author._id))) {
        req.flash('error', "You don't have permission")
        return res.redirect('/campgrounds/' + id)
    }
    return next()
}

function validateCampground(req, res, next) {
    const { error } = Campschema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return next(new AppError(msg, 400)); // Use `next` to handle errors
    }
    next();
}

function validateReview(req, res, next) {
    const { error } = Reviewschema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return next(new AppError(msg, 400)); // Use `next` to handle errors
    }
    next();
}

function validateUser(req, res, next) {
    const { error } = Userschema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return next(new AppError(msg, 400)); // Use `next` to handle errors
    }
    next();
}

module.exports = { isLoggedIn, storeReturnTo, isAuthCamp, isAuthReview, validateCampground, validateReview, validateUser };
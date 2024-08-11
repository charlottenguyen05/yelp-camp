const express = require('express');
const router = express.Router({ mergeParams: true });
const { Reviewschema } = require('../validateSchema');  // {} Import named export
const Review = require('../models/review');
const Campground = require('../models/campground');
const wrapAsync = require('../utilities/wrapAsync');
const { isLoggedIn, isAuthReview, validateReview } = require('../utilities/middleware')

module.exports.returnShowPage = (req, res) => {
    const { id } = req.params;
    res.redirect('/campgrounds/' + id)
}

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const newReview = await new Review({ rating: req.body.review.rating, text: req.body.review.text, author: userId })
    newReview.save()
    const camp = await Campground.findById(id)
    camp.reviews.push(newReview)
    camp.save()
    res.redirect('/campgrounds/' + id)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })   // Pull out of the arr of review the review that has the id of reviewId
    res.redirect('/campgrounds/' + id)
}
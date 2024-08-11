const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utilities/wrapAsync');
const { isLoggedIn, isAuthReview, validateReview } = require('../utilities/middleware')
const reviews = require('../controllers/reviews')


router.route('/')
    .get(reviews.returnShowPage)
    .post(isLoggedIn, validateReview, wrapAsync(reviews.createReview))

router.route('/:reviewId')
    .get(reviews.returnShowPage)
    .delete(isLoggedIn, isAuthReview, wrapAsync(reviews.deleteReview))


module.exports = router;
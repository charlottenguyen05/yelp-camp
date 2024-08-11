const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const path = require('path')
const Campground = require('../models/campground');
const wrapAsync = require('../utilities/wrapAsync');
const { isLoggedIn, isAuthCamp, validateCampground } = require('../utilities/middleware')
const campgrounds = require('../controllers/campgrounds')
const {upload} = require('../config/multerConfig')


// ------ ROUTER -----------

router.route('/')
    .get(wrapAsync(campgrounds.index))

router.route('/new')
    .get(isLoggedIn, campgrounds.addCamgroundForm)
    .post(isLoggedIn, upload.array('imgFiles'), validateCampground, wrapAsync(campgrounds.createNewCampground))

router.route('/:id')
    .get(wrapAsync(campgrounds.renderOneCampground))
    .delete(isLoggedIn, isAuthCamp, wrapAsync(campgrounds.deleteCampGround))

router.route('/:id/edit')
    .get(isLoggedIn, isAuthCamp, wrapAsync(campgrounds.getEditForm))
    .put(isLoggedIn, isAuthCamp, upload.array('imgFiles'), validateCampground, wrapAsync(campgrounds.editCampground))

module.exports = router;

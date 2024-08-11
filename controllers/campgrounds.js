const Campground = require('../models/campground');
const { cloudinary } = require('../config/multerConfig')
const { config, geocoding } = require('@maptiler/client');
const { query } = require('express');
config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index.ejs', { campgrounds });
}

module.exports.addCamgroundForm = (req, res) => {
    res.render('campgrounds/new.ejs')
}

module.exports.createNewCampground = async (req, res) => {
    // Geocode the location
    let data = {
        title: req.body.title,
        location: req.body.location,
        price: req.body.price,
        description: req.body.description,
        author: req.user._id,
        images: req.files.map((file) => ({ path: file.path, filename: file.filename })),
    }
    const geoData = await geocoding.forward(data.location, { limit: 1 })
    data.geometry =  geoData.features[0].geometry
    let newcamp = new Campground(data)
    await newcamp.save()
    req.flash('success', 'Successfully made a new campground')
    res.redirect('/campgrounds')
}

module.exports.renderOneCampground = async (req, res) => {
    const { id } = req.params
    const camp = await Campground.findById(id)
        // Populate the reviews array and then populate author inside each review (author of each comment)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
                model: 'User'
            }
        })
        .populate('author')   // Populate author of Campground
    if (!camp) {
        req.flash('error', "Can't find that campground")
        return redirect('/campgrounds')
    }
    res.render('campgrounds/show.ejs', { camp })
}

module.exports.deleteCampGround = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndDelete(id)
    for (img of camp.images) {
        await cloudinary.uploader.destroy(img.filename)
    }
    req.flash('success', 'Successfully delete a campground')
    res.redirect('/campgrounds')
}

module.exports.getEditForm = async (req, res) => {
    const { id } = req.params
    const camp = await Campground.findById(id).populate('author')
    if (!camp) {
        req.flash('error', "Can't find that campground")
        return res.redirect('/campgrounds')
    }
    return res.render('campgrounds/edit.ejs', { camp })
}

module.exports.editCampground = async (req, res) => {
    let data = {
        title: req.body.title,
        location: req.body.location,
        price: req.body.price,
        description: req.body.description,
    }
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, data);

    // Add images
    const imgFiles = req.files.map((file) => ({ path: file.path, filename: file.filename }));
    await campground.images.push(...imgFiles)
    await campground.save()

    // Delete images in Cloudinary and Mongo
    const filesNameToDelete = req.body.deleteImages;
    if (filesNameToDelete) {
        for (file of filesNameToDelete) {
            await cloudinary.uploader.destroy(file)
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: filesNameToDelete } } } })
    }
    await campground.save()
    if (!campground) {
        req.flash('error', "Can't find that campground")
        return redirect('/campgrounds')
    }
    req.flash('success', 'Successfully update a campground')
    res.redirect('/campgrounds/' + id)
}
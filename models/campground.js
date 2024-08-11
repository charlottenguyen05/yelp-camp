const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

// Include virtuals when convert to JSON
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    images: [
        {
            path: String,
            filename: String,
        }
    ],
    description: String,
    location: String,
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: "Review"
    }],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, opts)

CampgroundSchema.virtual('properties.popUpText').get(function() {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>`
})

CampgroundSchema.post('findOneAndDelete', async function (data, next) {
    if (data) {
        for (const review of data.reviews) {
            await Review.deleteMany({ _id: review._id });
        }
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)




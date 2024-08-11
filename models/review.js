const mongoose = require('mongoose')
const { schema } = require('../validateSchema')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    text: String,
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Review', reviewSchema)
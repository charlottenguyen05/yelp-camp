
const mongoose = require('mongoose');
const Campground = require('../models/campground');
let { cities } = require('./cities')
let { descriptors, places } = require('./seedsHelper')
require('dotenv').config();
const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/yelp-camp'


mongoose
    .connect(mongoURL)
    .then(() => console.log(`Connected to ${mongoURL}`))
    .catch(error => handleError(error));

mongoose.connection.on('error', err => {
    logError(err);
});


function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

async function seedsDB() {
    await Campground.deleteMany({})
    for (let i = 1; i <= 250; i++) {
        let rand500 = Math.floor(Math.random() * 500) + 1;
        let price = Math.round((Math.random() * 1000 + 1) * 100) / 100;
        let location = `${cities[rand500].city}, ${cities[rand500].state}`
        let title = `${rand(descriptors)} ${rand(places)}`
        let author = '66b70ea8bcde962b1b029ef8'
        let newCampGround = new Campground({
            title: title,
            location: location,
            price: price,
            author: author,
            geometry: {
                type: 'Point',
                coordinates: [cities[rand500].longitude, cities[rand500].latitude],
            },
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam molestias eligendi laboriosam minima cupiditate eveniet quo asperiores. Natus, laudantium dolore. Sed accusantium illo quisquam dolorem! Ducimus, debitis veniam! Quae, sed?',
            images: [
                {
                    path: 'https://res.cloudinary.com/drtfkcy87/image/upload/v1722590532/YelpCamp/khcbngdp4aeqiawcw3nm.jpg',
                    filename: 'YelpCamp/khcbngdp4aeqiawcw3nm'
                },
                {
                    path: 'https://res.cloudinary.com/drtfkcy87/image/upload/v1722585430/YelpCamp/my6bhu1ygzacdourmzkb.jpg',
                    filename: 'YelpCamp/my6bhu1ygzacdourmzkb'
                }
            ]
        })
        await newCampGround.save()
    }
}


// Close mongoose connection
seedsDB().then(() => {
    mongoose.connection.close();
})

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Where is your email?"],
        unique: true
    }
})

// plugin Passport-Local Mongoose: add username, hashed password, methods to userSchema
userSchema.plugin(passportLocalMongoose)  

module.exports = mongoose.model('User', userSchema)
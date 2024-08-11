const Joi = require('./utilities/joiExtension');  // Import the extended Joi

const Campschema = Joi.object({
    title: Joi.string().escapeHTML().required(),
    location: Joi.string().escapeHTML().required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().escapeHTML().required(),
    deleteImages: Joi.array()
})

const Reviewschema = Joi.object({
    // Access the rating, text properties of review object 
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        text: Joi.string().escapeHTML().required()
    }).required()
})

const Userschema = Joi.object({
    username: Joi.string().alphanum().required().escapeHTML(),
    password: Joi.string().required(),
    email: Joi.string().email().required().escapeHTML()
})

module.exports = { Campschema, Reviewschema, Userschema };  // Named export
const express = require('express');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const flash = require('connect-flash')
const session = require('express-session')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')
const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/yelp-camp'
const MongoStore = require('connect-mongo');
const secret = process.env.SECRET || 'thisshouldbeabettersecret'

module.exports = (app) => {
    app.use(session({
        store: MongoStore.create({
            mongoUrl: mongoURL,
            collectionName: 'sessions', // Name of the collection to store sessions in
            crypto: {
                secret: secret
            }
        }),
        name: 'session',  // Set another name for the session
        secret:  secret,
        resave: false,       // Do not save session if unmodified
        saveUninitialized: true, // Save a new session even if it’s uninitialized
        cookie: {
            httpOnly: true,
            // secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));
    
    // Views setting, accept form submission 
    app.set('view engine', 'ejs');
    app.engine('ejs', engine);
    app.use(methodOverride('_method'));
    app.use(express.urlencoded({ extended: true }));
    
    // Flash setting
    app.use(flash())
    
    // --- Mongo Sanitize ---
    app.use(mongoSanitize()); 
    
    // ---- HELMET CONFIG ------
    const scriptSrcUrls = [
        "https://stackpath.bootstrapcdn.com/",
        "https://kit.fontawesome.com/",
        "https://cdnjs.cloudflare.com/",
        "https://cdn.jsdelivr.net",
        "https://cdn.maptiler.com/", // add this
    ];
    const styleSrcUrls = [
        "https://kit-free.fontawesome.com/",
        "https://stackpath.bootstrapcdn.com/",
        "https://fonts.googleapis.com/",
        "https://use.fontawesome.com/",
        "https://cdn.jsdelivr.net",
        "https://cdn.maptiler.com/", // add this
    ];
    const connectSrcUrls = [
        "https://api.maptiler.com/", // add this
    ];
    
    const fontSrcUrls = [];
    
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'self'", "'unsafe-inline'",...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'",...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://api.maptiler.com/",
                "https://images.unsplash.com/",
                "https://res.cloudinary.com/drtfkcy87/"  // This should match your Cloudinary acc
            ], 
            fontSrc: ["'self'", ...fontSrcUrls]
        }
    }));
    
}


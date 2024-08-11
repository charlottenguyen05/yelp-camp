if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const AppError = require('./utilities/appError')
const userRoutes = require('./routes/users')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// require the model with Passport-Local Mongoose plugin 
const User = require('./models/user')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')
const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/yelp-camp'
const MongoStore = require('connect-mongo');
const secret = process.env.SECRET || 'thisshouldbeabettersecret'

//'mongodb://127.0.0.1:27017/yelp-camp'

// handle initial connection errors
mongoose
    .connect(mongoURL)
    .then(() => console.log(`Connected to ${mongoURL}`))
    .catch(error => handleError(error));

// Catch err after inital connection
mongoose.connection.on('error', err => {
    console.error('Database error:', err);
});


// Open a session
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
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', engine);

// Uploads file
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Flash setting
app.use(flash())

// --- PASSPORT SETUP -----
app.use(passport.initialize())  // Initialize Passport to be used within app
app.use(passport.session())   // Enable persistent login session with Passport
// Set up Passport to use Local strategy fot authentication with the User model
passport.use(new LocalStrategy(User.authenticate()))

// serializeUser: Store userId in session data
// deserialzeUser: Retrieve user data from the session data by using the stored userId 
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: [],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'self'", "'unsafe-inline'",...styleSrcUrls],
        workerSrc: ["'self'", "blob: "],
        imgSrc: [
            "'self'",
            "'blob'",
            "data:",
            "https://api.maptiler.com/",
            "https://images.unsplash.com/",
            "https://res.cloudinary.com/drtfkcy87/"  // This should match your Cloudinary acc
        ], 
        fontSrc: ["'self'"]
    }
}));

// --- PASS LOCALS PARAMS TO THE EJS FILE --- 
app.use((req, res, next) => {
    res.locals.currentUser = req.user  // RETRIEVE INFORMATION OF CURRENTLY LOGGED IN USER
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})



app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes); // Ensure this matches the path in your review routes
app.use('/', userRoutes); // Ensure userRoutes is mounted after other routes to avoid conflicts
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.all('*', (req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);    
    next(new AppError('Page not found', 404))
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.render('campgrounds/error', { err })
})

app.listen(3000, () => console.log('Serving on port 3000'));
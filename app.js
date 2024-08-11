if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const AppError = require('./utilities/appError')
const userRoutes = require('./routes/users')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// require the model with Passport-Local Mongoose plugin 
const User = require('./models/user')
const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/yelp-camp'
const setupMiddleware = require('./utilities/setupApp.js')


// --- CONNECT TO MONGO ATLAS ---
mongoose
    .connect(mongoURL)
    .then(() => console.log(`Connected to ${mongoURL}`))
    .catch(error => handleError(error));

// Catch err after inital connection
mongoose.connection.on('error', err => {
    console.error('Database error:', err);
});


// --- SET UP APP ----
setupMiddleware(app)
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- PASSPORT SETUP -----
app.use(passport.initialize())  // Initialize Passport to be used within app
app.use(passport.session())   // Enable persistent login session with Passport
// Set up Passport to use Local strategy fot authentication with the User model
passport.use(new LocalStrategy(User.authenticate()))

// serializeUser: Store userId in session data
// deserialzeUser: Retrieve user data from the session data by using the stored userId 
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user  // RETRIEVE INFORMATION OF CURRENTLY LOGGED IN USER
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


// --- ROUTES --- 
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
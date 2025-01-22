# YelpCamp 🏕️


A full-stack RESTful application for campers to share campgrounds, comment on them, and explore camping sites all over the world. This project is inspired by the Web Developer Bootcamp curriculum in Udemy by Colt Steele.


## 📋 Table of Contents
- [Introduction](#introduction)
- [Features](#features-✨)
- [Live Demo](#live-demo-🚀)
- [Technologies Used](#technologies-used-🛠)
- [Installation](#installation-💻)
- [Usage](#usage-📱)
- [Project Structure](#project-structure-📂)
- [Roadmap](#roadmap-🗺)
- [Contributing](#contributing-🤝)
- [License](#license-📑)
- [Acknowledgments](#acknowledgments-🙏)

---

## Introduction
YelpCamp is a Node.js application allowing users to view and share campgrounds worldwide. Users can:

- 📌 Create an account  
- 📌 Add new campgrounds  
- 📌 View details of each campground  
- 📌 Leave comments on campgrounds  
- 📌 Edit or delete campgrounds/comments they own  

This project demonstrates key concepts in modern JavaScript development, database modeling, user authentication, and more.

---

## Features ✨

- **User Authentication**  
  🔒 Register and log in using [Passport.js](http://www.passportjs.org/).

- **RESTful Routes**  
  ✅ Perform all CRUD operations on campgrounds and comments.

- **Reviews & Ratings**  
  ⭐ Users can leave feedback and rate the campgrounds.

- **Image Upload**  
  🖼 Integrated with [Cloudinary](https://cloudinary.com/) (or local uploads) for storing images.

- **Maps Integration**  
  🗺 Integrated with [Mapbox](https://www.mapbox.com/) to show campground locations on a map.

- **Responsive Design**  
  📱 Built with mobile-first principles using [Bootstrap](https://getbootstrap.com/).

---

## Live Demo 🚀

**[Check out the live demo here!](#)**  
*(Replace the placeholder with your actual deployed URL.)*

---

## Technologies Used 🛠

- **Front-end:**
  - [EJS](https://ejs.co/) for templating
  - [Bootstrap](https://getbootstrap.com/) for styling
  - [jQuery](https://jquery.com/) for dynamic behavior

- **Back-end:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [Mongoose](https://mongoosejs.com/) (MongoDB driver and object modeling)

- **Database:**
  - [MongoDB](https://www.mongodb.com/)

- **Authentication & Security:**
  - [Passport.js](http://www.passportjs.org/)
  - [Express Session](https://www.npmjs.com/package/express-session)

- **API & Services:**
  - [Mapbox API](https://www.mapbox.com/)
  - [Cloudinary API](https://cloudinary.com/)

---

## Installation 💻

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YourUsername/YelpCamp.git
   cd YelpCamp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory and add the following (example values):
   ```bash
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   MAPBOX_TOKEN=your_mapbox_token
   SESSION_SECRET=someSecretValue
   MONGODB_URI=mongodb://localhost:27017/yelp_camp
   PORT=3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to see the application in action.

---

## Usage 📱

1. **Create an Account**  
   Sign up for a new account or log in if you already have one.

2. **Add Campgrounds**  
   Click on **New Campground** to add your own campground with an image, location, and description.

3. **Write Reviews**  
   Leave reviews for campgrounds you have visited. Update or delete them as needed.

4. **Manage Your Listings**  
   Edit or delete your campgrounds and reviews at any time.

---

## Project Structure 📂

```
YelpCamp/
├── controllers/        // Route handler logic
├── middleware/         // Custom middleware (e.g., isLoggedIn)
├── models/             // Mongoose models (Campground, User, Review)
├── public/             // Static assets (stylesheets, client-side scripts)
├── routes/             // Express route files
├── seeds/              // (Optional) Seed files to populate the database
├── views/              // EJS templates
├── .env                // Environment variables
├── app.js              // Main application file
├── package.json
└── README.md
```

---

## Roadmap 🗺

- **User Profiles**  
  Display user details and all campgrounds created by a particular user.

- **Favorites**  
  Let users “favorite” a campground for quick reference later.

- **Search Functionality**  
  Implement search by location/name.

- **Notifications**  
  Notify users when someone comments on their campground.

- **Dark Mode**  
  Add a toggle for dark mode or other theme features.

---

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. **Fork the project**  
2. **Create your feature branch**:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/my-new-feature
   ```
5. **Open a Pull Request**

---

## License 📑

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments 🙏

- [Colt Steele](https://github.com/Colt) for the original course and inspiration.  
- [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) which introduced this project.  
- [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), and [Node.js](https://nodejs.org/) for the robust server-side foundation.  
- [Mapbox](https://www.mapbox.com/) for location services.  
- [Cloudinary](https://cloudinary.com/) for image hosting.

🌲 **Happy Camping!** ⛺

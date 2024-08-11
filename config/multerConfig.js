const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'YelpCamp',
      allowed_formats: ['jpeg', 'png', 'jpg'],
      transformation: [{ width: 400, height: 400, crop: 'fill' }]
    },
  });
// Initialize upload with multer storage
const upload = multer({ storage: storage });

module.exports = {upload, cloudinary};
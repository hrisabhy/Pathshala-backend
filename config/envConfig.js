require("dotenv").config();

module.exports = {
  DBCONN: process.env.DBCONN,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
};

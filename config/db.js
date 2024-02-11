const mongoose = require("mongoose");
const env = require("../config/envConfig");
const connect = async () => {
  try {
    const res = await mongoose.connect(env.DBCONN, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database connected");
  } catch (err) {
    console.log(err.message);
    process.exit;
  }
};

module.exports = connect;

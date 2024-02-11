require("dotenv").config();

module.exports = {
  DBCONN: process.env.DBCONN,
  JWT_SECRET: process.env.JWT_SECRET,
};

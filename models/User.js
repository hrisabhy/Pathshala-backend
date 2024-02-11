const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "auditor"],
    default: "user",
  },
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);

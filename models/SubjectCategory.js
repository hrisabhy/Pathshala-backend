const mongoose = require("mongoose");

const subjectCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("SubjectCategory", subjectCategorySchema);

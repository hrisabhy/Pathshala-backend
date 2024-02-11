const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true, // Store path or cloud storage URL
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  approved: {
    type: Boolean,
    default: false,
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "SubjectCategory",
  },
});

module.exports = mongoose.model("Note", noteSchema);

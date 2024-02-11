const mongoose = require("mongoose");
const { Schema } = mongoose;

const applicationSchema = Schema({
  user_id: {
    type: mongooose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  application_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  approval_status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Application", applicationSchema);

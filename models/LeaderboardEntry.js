const mongoose = require("mongoose");
const { Schema } = mongoose;

const leaderboardEntrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  points: {
    type: Number,
    default: 0,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("LeaderboardEntry", leaderboardEntrySchema);

const { Schema, model, default: mongoose } = require("mongoose");

const reactsSchema = new Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (currentDate) => {
      return currentDate;
    },
  },
});

module.exports = reactsSchema;
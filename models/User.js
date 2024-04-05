const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thoughts",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});


// Initialize our User model
const User = model("user", userSchema);

module.exports = User;

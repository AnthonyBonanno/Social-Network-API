const { Schema, model } = require("mongoose");
const reactsSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (currentDate) => {
        return currentDate;
      },
    },

    username: {
      type: String,
      required: true,
    },

    // this array will be the entire schema for the react (id, react type, ect...)
    reactions: [reactsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;

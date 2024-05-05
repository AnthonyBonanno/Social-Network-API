const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no user with that ID",
        });
      }

      res.json({ thought, message: "Thought successfully created!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Add a reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json({ thought, message: "Reaction successfully created!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({ thought, message: "Thought successfully updated!" })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({
          message: "No thought with that ID found",
        });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        { $pull: { thoughts: { thoughtId: req.params.thoughtId } } }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({ user, message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No thought with that ID found",
        });
      }

      res.json({ thought, message: "Reaction successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

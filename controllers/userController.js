const { User } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find().select('-friends -thoughts');
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    // Get a single user
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    // Create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json({ user, message: "User successfully created!" });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Add a friend
    async addFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ user, message: 'No user found with that ID' });
        }

        res.json({ user, message: "Friend successfully created!" });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    // Update a user
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId }, 
          { $set: req.body }, 
          { runValidators: true, new: true }
        );

        if (!user) {
          return res.status(404).json({ user, message: 'No user with that ID' });
        }

        res.json({ user, message: "User successfully updated!" });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Delete a user and associated thoughts
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        await Application.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ user, message: 'User and associated thoughts deleted!' })
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async deleteFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: { friendId: req.params.friendId } } }
        );

        if (!user) {
          return res.status(404).json({
            message: "No user with that ID found",
          });
        }
  
        res.json({ user, message: "Friend successfully deleted" });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };
  
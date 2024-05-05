const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersData, thoughtsData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    const users = [];

    // IF we want to DELETE EXISTING Collections (tables)
    // "user" becomes "users" and "thought" becomes "thoughts"
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if(userCheck.length) {
        await connection.dropCollection('users');
    }

    usersData.forEach(user => {
        let newUser = {
            username: user.username,
            email: user.email
        }

        users.push(newUser);
    })
    console.log("Users: ", users)

    await User.insertMany(users);


    const thoughts = [];
    
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if(thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    thoughtsData.forEach(thought => {
        let newThought = {
            thoughtText: thought.thoughtText,
            username: thought.username
        }

        thoughts.push(newThought);
    })
    console.log("Thoughts: ", thoughts)

    await Thought.insertMany(thoughts)

    console.table(users);
    console.table(thoughts);
    
    process.exit(0);
});
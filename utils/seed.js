const connection = require('../config/connection');
const { User } = require('../models');
const { usernames, emails } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    const users = [];

    users.push({
        usernames,
        emails,
    });

    console.table(users);
});
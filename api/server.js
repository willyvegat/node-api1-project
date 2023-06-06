// BUILD YOUR SERVER HERE

const express = require('express');
const User = require('./users/model');

const server = express();


server.get('/api/users', async (req, res) => {
    /* User.find()
        .then(users => {
            res.json(users);
        }) */
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({ message: `The users information could not be retrieved ${err.message}` });
    }
})

module.exports = server; 

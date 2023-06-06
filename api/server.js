// BUILD YOUR SERVER HERE

const express = require('express');
const User = require('./users/model');

const server = express();
server.use(express.json());

server.get('/api/users', async (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        }) 
        .catch(err => {
            res.status(500).json({ 
                message: "The users information could not be retrieved",
                err: err.message  
            });
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
            res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ 
                message: "The user information could not be retrieved",
                err: err.message 
            });
        })
})

server.post('/api/users', (req, res) => {
    const user = req.body;
    if(!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
        User.insert(user)
            .then(newUser => {
                res.status(201).json(newUser);
            })
            .catch(err => {
                res.status(500).json({ 
                    message: "There was an error while saving the user to the database",
                    err: err.message 
                })
            })
    }   
})

server.delete('/api/users/:id', async (req, res) => {
    const removeUser = await User.findById(req.params.id)
    if(!removeUser) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } else {
        const deletedUser = await User.remove(req.params.id)
        res.status(200).json(deletedUser)
    }
})

// server.put('/api/users/:id', (req, res) => {
//     User.update()
// })



module.exports = server; 

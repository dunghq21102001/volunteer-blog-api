const express = require('express');
const cors = require('cors');
const userModel = require('../entity/user');

const userRouter = express.Router();
userRouter.use(cors());

const bcrypt = require('bcrypt');

userRouter.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await userModel.findOne({ userName });

        if (!user) {
            return res.status(401).send({ error: 'Invalid username or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid username or password.' });
        }

        res.send({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred during login.' });
    }
});

userRouter.get('/', async (req, res) => {
    try {
        const listUser = await userModel.find({});
        res.send(listUser);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching users.' });
    }
});

userRouter.post('/', async (req, res) => {
    try {
        const newUser = new userModel({
            ...req.body,  
            role: 'USER'
        });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ error: 'An error occurred while creating the user.' });
    }
});

userRouter.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found.' });
        }

        res.send(updatedUser);
    } catch (error) {
        res.status(400).send({ error: 'An error occurred while updating the user.' });
    }
});

userRouter.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).send({ error: 'User not found.' });
        }

        res.send({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the user.' });
    }
});

module.exports = userRouter; 

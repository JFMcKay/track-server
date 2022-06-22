const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

// and object that we can associate routes with
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // create a new user
    try {
        const user = new User({ email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (err) {
        return res.status(422).send(err.message);
    };
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    // check if email and pass provided
    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' });
    };
    // check if a user exists with given email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ error: 'Invalid password or email' });
    };
    // check if password is correct
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});

module.exports = router;
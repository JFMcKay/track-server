const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

// requireAuth is a middleware that requires a user to be logged in
router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    // req.user._id === user
    const tracks = await Track.find({ user: req.user._id });

    res.send(tracks);
});

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;
    if (!name || !locations) {
        return res
        .status(422)
        .send({ error: 'You must provide a name and location'});
    }

    try {
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();
        res.send(track);
    } catch(err) {
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;
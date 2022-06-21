const express = require('express');

// and object that we can associate routes with
const router = express.Router();

router.post('/signup', (req, res) => {
    console.log(reg.body);
    res.send('Signing up new user');
});

module.exports = router;
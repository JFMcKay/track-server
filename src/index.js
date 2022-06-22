require ('./models/Users');
require ('./models/Track');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose'); // mongoose is a promise-based MongoDB driver for Node.js
const bodyParser = require('body-parser'); // for parsing POST requests

const authRoutes = require('./routes/authRoutes'); // for handling user authentication
const trackRoutes = require('./routes/trackRoutes'); // for handling track data

const requireAuth = require('./middlewares/requireAuth'); // for requiring authentication

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(authRoutes);
app.use(trackRoutes);
// BEGIN MONGOOSE CODE
dotenv.config();
const mongoUri = process.env.MONGO_KEY;

mongoose.connect(mongoUri, { 

});

mongoose.connection.on('connected', 
() => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', 
() => {
    console.error('Error connecting to mongo');
});
// END MONGOOSE CODE

// get request
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
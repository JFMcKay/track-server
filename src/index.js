const express = require('express');
const mongoose = require('mongoose'); // mongoose is a promise-based MongoDB driver for Node.js
const bodyParser = require('body-parser'); // for parsing POST requests
const authRoutes = require('./routes/authRoutes'); // for handling user authentication

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(authRoutes);
// BEGIN MONGOOSE CODE
const mongoUri = 'mongodb+srv://jfmckay858:adminadmin@cluster0.c2qzt.mongodb.net/?retryWrites=true&w=majority';

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
app.get('/', (req, res) => {
    res.send('Hello There!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
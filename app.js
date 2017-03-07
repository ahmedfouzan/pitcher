const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

const users = require('./routes/users');

// Port number
const port = process.env.PORT || 3000;

// CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyParser.json());

// /users route 
app.use('/users',users);

// Index Route
app.get('/', function(req, res){
    res.sendFile(index.html);
});

// Start server
app.listen(port, function(err){
    if(err) throw err;
    console.log("Server started on port " + port);
});

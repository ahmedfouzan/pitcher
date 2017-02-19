const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

const users = require('./routes/users');

// Port number
const port = 3000;

// CORS Middleware
app.use(cors());

// Body parser Middleware
app.use(bodyParser.json());

// /users route 
app.use('/users',users);

// Index Route
app.get('/', function(req, res){
    res.send("Hello World");
    console.log('Request...');
});

// Start server
app.listen(port, function(err){
    if(err) throw err;
    console.log("Server started on port " + port);
});

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Register user
router.post('/register', function(req, res){
     let newUser = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob
     }

    User.addUser(newUser, function(user){
        if(!user)
            return res.json({success: false, msg: 'User already exists or Couldn\'t createthe user' });
        return res.json({success: true, msg: "User registered", properties: user._fields[0].properties})
    });

});

// Authenticate
router.post('/authenticate', function(req, res){

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, function(err, user){
        if(err)
            throw err;
        if(!user)
            return res.json({success: false, msg: 'User not found'});
        return res.json({success: false, msg: "User found"})
        //User.comparePassword()
    });
});

module.exports = router;
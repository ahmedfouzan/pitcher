const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

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

    User.addUser(newUser, function(err, user){
        if(err)
            if(!user)
                return res.json({success: false, msg: 'User already exists'});
            else
                return res.json({success: false, msg: err});
        return res.json({success: true, msg: "User registered", properties: user})
    });

});

// Authenticate
router.post('/authenticate', function(req, res){

    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, function(err, user){
        if(err)
            return res.json({success: false, msg: err});
        if(!user)
            return res.json({success: false, msg: 'User not found'});

        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}) ,function(req, res, next){
    res.json({user: req.user});
});

module.exports = router;
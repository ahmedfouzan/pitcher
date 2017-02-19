const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const database = require('../config/database');

// Register session
const session = database.getSession();

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

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err) throw err;
                newUser.password = hash;

                // Store in the database
                session
                    .run("CREATE (n:USER {username:{username},password:{password},name:{name},email:{email},gender:{gender},dob:{dob}}) RETURN n",newUser)
                    .subscribe({
                        onNext: function(record) {
                            res.json({success: true, msg: 'User registered', properties: record._fields[0].properties});
                        },
                        onCompleted: function() {
                            // Completed
                            session.close();
                        },
                        onError: function(error) {
                            res.json({success: false, msg: 'Failed to register user'});
                        }
                    });
        });
    });

});

module.exports = router;
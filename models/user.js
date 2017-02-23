const bcrypt = require('bcryptjs');
const database = require('../config/database');


// Register session
const session = database.getSession();

// Add new user
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err) throw err;
                newUser.password = hash;

                // Store in the database
                session
                    .run("CREATE (n:USER {username:{username},password:{password},name:{name},email:{email},gender:{gender},dob:{dob}}) RETURN n",newUser)
                    .subscribe({
                        onNext: function(record) {
                            callback(record);
                        },
                        onCompleted: function() {
                            // Completed
                            session.close();
                        },
                        onError: function(error) {
                            callback(null);
                        }
                    });
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
   session
        .run("MATCH (n:USER {username:{username}}) RETURN n.password",{username:username})
        .subscribe({
            onNext: function(record) {
                callback(null, record);
            },
            onCompleted: function() {
                // Completed
                session.close();
            },
            onError: function(error) {
                callback(error,null);
            }
        });
}
const bcrypt = require('bcryptjs');
const database = require('../config/database');


// Register session
const session = database.getSession();

// Add new user
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err) throw err;
                if(!session)
                    callback("Database error",null);
                else
                    // Store in the database
                    session
                        .run("CREATE (n:USER {username:{username},password:{password},name:{name},email:{email},gender:{gender},dob:{dob}}) RETURN n",newUser)
                        .subscribe({
                            onNext: function(record) {
                                callback(null, record._fields[0].properties);
                            },
                            onCompleted: function() {
                                // Completed
                                session.close();
                            },
                            onError: function(error) {
                                callback(error, null);
                            }
                        });
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    if(!session)
        callback("Database error",null);
    else{
        session
            .run("MATCH (n:USER {username:{username}}) RETURN n",{username:username})
            .then(function(result){
                if(result.records.length)
                    result.records.forEach(function(record) {
                        callback(null, record._fields[0].properties);
                    });
                else
                    callback("User doesn't exist", null);
                    
                // Completed!
                session.close();
            })
            .catch(function(error) {
                    callback(error,null);
                    console.log(error);
            });
    }
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}
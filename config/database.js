const neo4j = require('neo4j-driver').v1;

// Create a neo4j driver instance
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "12345"));

exports.getSession = function(){
    return driver.session();
};
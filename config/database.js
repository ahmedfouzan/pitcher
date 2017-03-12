const neo4j = require('neo4j-driver').v1;

// Create a neo4j driver instance

module.exports = {
    driver : neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "12345")),
    secret : 'yoursecret'
}

module.exports.getSession = function(){
    this.driver.onCompleted = function() {
        console.log('Driver instantiation successful');
    };

    // Register a callback to know if driver creation failed.
    // This could happen due to wrong credentials or database unavailability:
    this.driver.onError = function(error) {
        console.log('Driver instantiation failed', error);
        return null;
    };
    return this.driver.session();
};
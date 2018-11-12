const db = require('./db');


module.exports.handleSignUp = (email, password) =>{
    // check the email already exist.
    // save the user in the db
    db.saveUser({email, password});
    // Send the welcome email.
}
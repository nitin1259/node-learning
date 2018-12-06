const mongoose = require('mongoose');

/**
 * Check your mongo version

mongo --version
If you are using version >= 3.1.0 change you mongo connection file to ->

MongoClient.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true })
or your mongoose connection file to ->

mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });
 * 
 */

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});


module.exports = { mongoose }
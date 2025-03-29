process.env.DEBUG = "development:mongooseconfig";  // Environment variable set krna padta h har bar.

const mongoose = require('mongoose');
const debuglog = require('debug')('development:mongooseconfig');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on("error", function(err) {
    debuglog("Mongoose connection error:", err);
});

db.once("open", function() {
    debuglog("Mongoose connection successful");
});

module.exports = db;
module.exports = function () {
    var mongoose = require("mongoose");
    var uniqueValidator = require('mongoose-unique-validator');

    var userSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        // dob: Date,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.user"});

    userSchema.plugin(uniqueValidator);
    return userSchema;

};
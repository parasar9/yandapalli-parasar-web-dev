module.exports = function () {
    var mongoose = require("mongoose");

    var websiteSchema = mongoose.Schema({
        developerId: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.website"});
    
    return websiteSchema;

};
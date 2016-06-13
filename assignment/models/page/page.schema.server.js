module.exports = function () {
    var mongoose = require("mongoose");

    var pageSchema = mongoose.Schema({
        websiteId: {type: mongoose.Schema.ObjectId, ref: "Website"},
        name: String,
        title: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.page"});

    return pageSchema;

};

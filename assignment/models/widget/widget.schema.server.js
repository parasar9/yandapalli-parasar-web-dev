module.exports = function () {
    var mongoose = require("mongoose");

    var widgetSchema = mongoose.Schema({
        pageId: {type: mongoose.Schema.ObjectId, ref: "Page"},
        widgetType: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        //width: Number,
        width: String, //a string with unit e.g. 500px, 80%, 200em
        height: String, //same as width
        class: String,
        icon: String,
        rows: Number,
        order: Number,
        size: {type: Number, min: 1, max: 6},
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return widgetSchema;

};

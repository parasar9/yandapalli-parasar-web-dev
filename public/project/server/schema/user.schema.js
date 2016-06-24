 

module.exports = function(app, mongoose, db) {

    var RecordSchema = require('./record.schema.js')(app, mongoose, db);
    var HistorySchema = require('./history.schema.js')(app, mongoose, db);

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        age: Date,
        gender: {type: String, enum: [null, 'male', 'female']},
        phone: Number,
        image: String,
        email: String,
        address: String,
        records: [RecordSchema],
        history: [HistorySchema],
    }, {collection: "cs5610.project.user"});

    return UserSchema;
}

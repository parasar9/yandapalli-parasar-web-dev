 
module.exports = function(app, mongoose, db) {

    var RecordSchema = mongoose.Schema({
        image: String,
        title: String,
        quantity: Number,
        bookId: String,
        userId: String,
        rating: Number,
        price: String,
    }, {collection: "cs5610.project.record"});

    return RecordSchema;
}

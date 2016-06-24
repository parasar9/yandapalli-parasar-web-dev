 
module.exports = function(app, mongoose, db) {

    var HistorySchema = mongoose.Schema({
        image: String,
        title: String,
        quantity: Number,
        bookId: String,
        userId: String,
        price: String,
        date: Date,
        rating: Number
    }, {collection: "cs5610.project.history"});

    return HistorySchema;
}
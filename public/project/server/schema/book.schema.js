

module.exports = function(app, mongoose, db) {

    var BookSchema = mongoose.Schema({
        asin: String,
        title: String,
        author: String,
        publisher: String,
        rating: Number,
        price: String,
        image: String,
        sellerId: String,
        sellerName: String
    }, {collection: "cs5610.project.book"});

    return BookSchema;
}

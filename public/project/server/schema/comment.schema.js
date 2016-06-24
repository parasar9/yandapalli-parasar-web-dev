 
module.exports = function(app, mongoose, db) {

    var CommentSchema = mongoose.Schema({
        userId: String,
        title: String,
        bookId: String,
        username: String,
        userImage: String,
        bookImage: String,
        comment: String,
        date: String
    }, {collection: "cs5610.project.comment"});

    return CommentSchema;
}


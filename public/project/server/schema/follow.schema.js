 
module.exports = function(app, mongoose, db) {

    var FollowSchema = mongoose.Schema({
        sellerId: String,
        userId: String,
        sellerName: String,
        sellerImage: String
    }, {collection: "cs5610.project.follow"});

    return FollowSchema;
}
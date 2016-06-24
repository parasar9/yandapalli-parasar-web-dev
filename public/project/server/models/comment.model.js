
var q = require("q");

module.exports = function(app, mongoose, db) {
    
    var CommentSchema = require('../schema/comment.schema.js')(app, mongoose, db);
    var CommentModel = mongoose.model('CommentModel', CommentSchema);    
    
    var api = {
        create: CreateComment,
        findCommentsByBookId: FindCommentsByBookId,
        findCommentsByUserId: FindCommentsByUserId,
        findById: FindCommentById,
        update: UpdateComment,
        delete: DeleteComment,
        deleteCommentsByUserId: DeleteCommentsByUserId,
        deleteCommentsByBookId: DeleteCommentsByBookId
    };
    return api;

    function CreateComment(comment) {
        var deferred = q.defer();
        CommentModel.create(comment, function(err, doc){
            CommentModel.find({bookId:doc.bookId}, function(err, comments){
                deferred.resolve(comments);    
            })
        })
        return deferred.promise;
    };

    function FindCommentsByUserId(userId){
        var deferred = q.defer();
        CommentModel.find({userId:userId}, function(err, comments){
            deferred.resolve(comments);
        })
        return deferred.promise;
    }

    function FindCommentsByBookId(bookId) {
        var deferred = q.defer();
        CommentModel.find({bookId:bookId}, function(err, comments){
            deferred.resolve(comments);
        })
        return deferred.promise;
    };

    function FindCommentById(id) {
        var deferred = q.defer();
        CommentModel.findById(id, function(err, comment){
            deferred.resolve(comment);
        })
        return deferred.promise;
    };

    function UpdateComment(bookId, id, comment) {
        var deferred = q.defer();

        CommentModel.update({_id:id}, {$set: {
           comment:comment.comment
        }}, function(err, num){
            CommentModel.find({bookId: bookId}, function(err, comments){
                deferred.resolve(comments);
            })
        })
        return deferred.promise;
    };

    function DeleteComment(bookId, id) {
        var deferred = q.defer();
        CommentModel.findById(id).remove(function(err, num){
            CommentModel.find({bookId: bookId}, function(err, comments){
                deferred.resolve(comments);
            })
        })
        return deferred.promise;
    };

    function DeleteCommentsByUserId(userId){
        var deferred = q.defer();
        CommentModel.find({userId: userId}).remove(function(err, num){
            deferred.resolve(num);
        })
        return deferred.promise;
    }

    function DeleteCommentsByBookId(bookId){
        var deferred = q.defer();
        CommentModel.find({bookId: bookId}).remove(function(err, num){
            deferred.resolve(num);
        })
        return deferred.promise;
    }
}  
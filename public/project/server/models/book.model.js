
var q = require("q");

module.exports = function(app, mongoose, db) {
    
    var BookSchema = require('../schema/book.schema.js')(app, mongoose, db);
    var BookModel = mongoose.model('BookModel', BookSchema);
    
    var api = {
        create: Create,
        findAll: FindAll,
        findById: FindById,
        update: Update,
        deleteBook: Delete,
        getSellerBooks: GetSellerBooks,
        deleteBySeller: DeleteBySeller,
        findBySeller: FindBySeller
    }

    return api;

    function Create(book) {
        var deferred = q.defer();
        BookModel.findOne({asin : book.asin}, function(err, doc){
            if(!doc){
                BookModel.create(book, function(err, book){
                    deferred.resolve(book);
                })
            }
            else
                deferred.resolve(doc);
        })
        return deferred.promise;

    };

    function FindAll() {
        var deferred = q.defer();
        BookModel.find(function(err, books){
            deferred.resolve(books);
        })
        return deferred.promise;
    };

    function FindById(id) {
        var deferred = q.defer();
        BookModel.findById(id, function(err, book){
            deferred.resolve(book);
        })
        return deferred.promise;
    };

    function GetSellerBooks(){
        var deferred = q.defer();
        BookModel.find({sellerId: { $ne: null }}, function(err, books){
            deferred.resolve(books);
        })
        return deferred.promise;
    }

    function Update(sellerId, id, book) {
        var deferred = q.defer();
        BookModel.update({_id:id}, {$set: {
            title: book.title,
            author: book.author,
            price: book.price,
            publisher: book.publisher,
            image: book.image,
        }}, function(err, num){
            BookModel.find({sellerId: sellerId}, function(err, books){
                deferred.resolve(books);
            });
        })
        return deferred.promise;
    };
    
    function Delete(sellerId, id) {
        var deferred = q.defer();
        BookModel.findById(id).remove(function(err, num){
            BookModel.find({sellerId: sellerId}, function(err, books){
                deferred.resolve(books);
            })
        })
        return deferred.promise;
    };

    function DeleteBySeller(sellerId){
        var deferred = q.defer();
        BookModel.find({sellerId: sellerId}).remove(function(err, num){
            deferred.resolve(num);
        })
        return deferred.promise;
    }

    function FindBySeller(sellerId){

        var deferred = q.defer();
        BookModel.find({sellerId: sellerId}, function(err, books){
            deferred.resolve(books);
        })
        return deferred.promise;
    }
}
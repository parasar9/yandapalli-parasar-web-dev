
var uuid = require('node-uuid');

module.exports = function(app, model, commentModel, auth){

    app.post("/api/project/book", CreateBook);
    app.get("/api/project/book", FindBooks);
    app.get("/api/project/book/:id", FindBookById);
    app.put("/api/project/book/:id", auth, UpdateBookById);
    app.delete("/api/project/book/:id/seller/:sellerId", auth, DeleteBookById);
    app.get("/api/project/seller/:sellerId/books", FindBooksBySeller);
    app.get("/api/project/seller/books/", GetSellerBooks);

    function CreateBook(req, res){
        var book = req.body;
        model.create(book).then(function(book){
            res.json(book);
        });
    }

    function FindBooks(req, res){
        model.findAll().then(function(books){
            res.json(books);
        });
    }

    function FindBookById(req, res){
        var id = req.params.id;
        model.findById(id).then(function(book){
            res.json(book);
        })
    }

    function UpdateBookById(req, res){
        var id = req.params.id;
        var book = req.body;
        model.update(book.sellerId, id, book).then(function(book){
            res.json(book)
        });
    }

    function DeleteBookById(req, res){
        var id = req.params.id;
        var sellerId = req.params.sellerId;
        commentModel.deleteCommentsByBookId(id).then(function(num){
            console.log(num);
            model.deleteBook(sellerId, id).then(function(books){
                res.json(books);
            });
        });
    }

    function FindBooksBySeller(req, res){
        var sellerId = req.params.sellerId;
        model.findBySeller(sellerId).then(function(books){
            res.json(books);
        });
    }

    function GetSellerBooks(req, res){
        model.getSellerBooks().then(function(books){
            res.json(books);
        });
    }
}

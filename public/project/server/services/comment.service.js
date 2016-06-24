
module.exports = function(app, model, auth){

    app.post("/api/project/comment", auth, CreateComment);
    app.get("/api/project/book/:bookId/comments", FindCommentsByBookId);
    app.get("/api/project/user/:userId/comments", auth, FindCommentsByUserId);
    app.get("/api/project/comment/:id", FindCommentById);
    app.put("/api/project/comment/:id", auth, UpdateCommentById);
    app.delete("/api/project/comment/:id/book/:bookId", auth, DeleteCommentById);
    app.delete("/api/project/user/:userId/comments/delete", auth, DeleteCommentsByUserId);
    app.delete("/api/project/book/:bookId/comments/delete", auth, DeleteCommentsByBookId);

    function CreateComment(req, res){
        var comment = req.body;
        model.create(comment).then(function(comments){
            res.json(comments);
        });
    }

    function FindCommentsByBookId(req, res){
        var bookId = req.params.bookId;
        model.findCommentsByBookId(bookId).then(function(comments){
            res.json(comments);
        });
    }

    function FindCommentsByUserId(req, res){
        var userId = req.params.userId;
        model.findCommentsByUserId(userId).then(function(comments){
            res.json(comments);
        });
    }

    function FindCommentById(req, res){
        var id = req.params.id;
        model.findById(id).then(function(comment){
            res.json(comment)
        });
    }

    function UpdateCommentById(req, res){
        var id = req.params.id;
        var comment = req.body;
        var bookId = comment.bookId;

        model.update(bookId, id, comment).then(function(comments){
            res.json(comments);
        });
    }

    function DeleteCommentById(req, res){
        var id = req.params.id;
        var bookId = req.params.bookId;

        model.delete(bookId, id).then(function(comments){
            res.json(comments);
        });
    }

    function DeleteCommentsByUserId(req, res){
        var userId = req.params.userId;
        model.deleteCommentsByUserId(userId),then(function(num){
            res.send(200);
        });
    }

    function DeleteCommentsByBookId(req, res){
        var bookId = req.params.bookId;
        model.deleteCommentsByUserId(bookId),then(function(num){
            res.send(200);
        });
    }
}

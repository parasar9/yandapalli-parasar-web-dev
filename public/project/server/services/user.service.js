var uuid = require('node-uuid');

module.exports = function(app, model, bookModel, commentModel, FollowModel, auth){

    //app.post("/api/project/user", CreateUser);
    //app.get("/api/project/user", FindUsers);
    app.get("/api/project/user/:id", FindUserById);
    //app.get("/api/project/user/username/:username/password/:password", FindUserByCredential)
    app.put("/api/project/user/:id", auth, UpdateUserById);
    app.delete("/api/project/user/:id", auth, DeleteUserById);
    app.get("/api/project/user/:id/visit", FindVisiter)
    /*
    function FindUserByCredential(req, res){

        var username = req.params.username;
        var password = req.params.password;

        var credentials = {
            username: username,
            password: password
        }
        model.findByCredentials(credentials).then(function(user){
            res.json(user);
        });
    }


    function CreateUser(req, res){
        var user = req.body;
        model.create(user).then(function(user){
            res.json(user);
        });
    }


    function FindUsers(req, res){
        model.findAll().then(function(users){
            res.json(users)
        });
    }
     */

    function FindUserById(req, res){
        var id = req.params.id;
        model.findById(id).then(function(user){
            res.json(user);
        });
    }

    function FindVisiter(req, res){
        var id = req.params.id;
        model.findVisiterById(id).then(function(user){
            res.json(user);
        });
    }

    function UpdateUserById(req, res){
        var id = req.params.id;
        var user = req.body;
        model.update(id, user).then(function(user){
            res.json(user);
        });
    }

    function DeleteUserById(req, res){
        var id = req.params.id;
        bookModel.deleteBySeller(id).then(function(num){
            commentModel.deleteCommentsByUserId(id).then(function(num){
                FollowModel.deleteFollowsByUserId(id).then(function(num){
                    model.delete(id).then(function(user){
                        res.json(user);
                    });
                });
            })
        })
    }
}

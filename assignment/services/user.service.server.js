/*
 created by @parashar Yandapalli
 */
module.exports = function (app,models) {

    var userModel = models.userModel;


    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    
    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function(user){
                    console.log(user);
                    res.json(user);
                },
            function(error)
            {
                res.statusCode(404).send(error);
            }
        )
        

    }
    
    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(username, password, res);
        } else if(username){
            findUserByUsername(username, res);
        }else {
            findAllUsers();
        }
    }

    function findAllUsers() {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function findUserByCredentials(username, password, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.statusCode(404).send(error);
                }
            )



    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(userId, newUser)
            .then(
                function(stats){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(404);
                }
            )

    }

    function deleteUser(req,res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }
};
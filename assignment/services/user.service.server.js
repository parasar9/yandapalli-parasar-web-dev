var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;

    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));
    app.post("/api/user", createUser);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.post('/api/login', passport.authenticate('wam'), login);
    app.get("/api/user", getUsers);
    app.get("/api/loggedIn", loggedIn);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use('wam', new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.SESSION_ID,
        clientSecret : process.env.SESSION_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use("facebook", new FacebookStrategy(facebookConfig, facebookLogin));

    function facebookLogin(token, refreshToken, profile, done) {
        userModel
            .findFacebookUser(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        user = {
                            username: profile.displayName.replace(/ /g, ""),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(user)
                            .then(
                                function (newUser) {
                                    done(null, newUser);
                                    //res.json(newUser);
                                },
                                function () {
                                    res.sendStatus(400);
                                }
                            );
                    }
                }
            )
    }



    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user && bcrypt.compareSync(password, user.password)) {
                    //if (user) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    done(err);
                }
            );
    }

    // function login(req, res) {
    //     var username = req.body.username;
    //     var password = req.body.password;
    //     userModel
    //         .findUserByCredentials(username, password)
    //         .then(
    //             function (user) {
    //                 req.session.currentUser = user;
    //                 res.json(user);
    //             },
    //             function (error) {
    //                 res.sendStatus(404).send(error);
    //             }
    //         );
    // }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.status(400).send("Username already exists.");
                        //return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        userModel
                            .createUser(req.body)
                            .then(
                                function (user) {
                                    if (user) {
                                        req.login(user, function (err) {
                                            if (err) {
                                                res.status(400).send("Failed to login with new user. ");
                                            } else {
                                                res.json(user);
                                            }
                                        })
                                    }
                                },
                                function () {
                                    res.status(400).send("Failed to create new user. ");
                                }
                            );
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.json(error);
                }
            );
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        // console.log([username, password]);
        if (username && password) {
            return findUserByCredentials(username, password, res, req);
        } else if (username) {
            return findUserByUsername(username, res);
        }
        res.sendStatus(400);
    }

    function loggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }

    }


    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function findUserByCredentials(username, password, res, req) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function () {
                    res.status(404).send("Username not found or wrong password");
                }
            );
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function () {
                    res.status(200).send("User updated. ");
                },
                function () {
                    res.status(404).send("Update failed. ");
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(
                function (user) {
                    res.sendStatus(200);
                },
                function () {
                    res.status(404).send("Deregistration failed. ");
                }
            );
    }


};
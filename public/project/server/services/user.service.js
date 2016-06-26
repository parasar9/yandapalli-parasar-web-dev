var uuid = require('node-uuid');
var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var googleConfig = {
    clientID : "442566998997-5cnukv00aq0ju1kei3ur7qn8uogfc8uo.apps.googleusercontent.com" ,
    clientSecret : "-q913VHxOgJAJQLPiHEGiOjo",
    callbackURL : "http://127.0.0.1:3000/auth/google/callback"
}
module.exports = function(app, model, bookModel, commentModel, FollowModel, auth){

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    //app.post("/api/project/user", CreateUser);
    //app.get("/api/project/user", FindUsers);
    app.get("/api/project/user/:id", FindUserById);
    //app.get("/api/project/user/username/:username/password/:password", FindUserByCredential)
    app.put("/api/project/user/:id", auth, UpdateUserById);
    app.delete("/api/project/user/:id", auth, DeleteUserById);
    app.get("/api/project/user/:id/visit", FindVisiter);
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/client/index.html#/profile',
            failureRedirect: '/project/client/index.html#/profile'
        }));

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


    passport.use('google',new GoogleStrategy(googleConfig,googleStrategy))



    function googleStrategy(token, refreshToken, profile, done,req,res) {
        model
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        model.Create(newGoogleUser).then(function (user) {
                            res.json(user);

                        })
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }



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

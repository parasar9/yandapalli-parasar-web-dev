
var express = require('express');
var app = express();

var mongoose = require('mongoose');
var localMongoPath = 'mongodb://127.0.0.1:27017/the_book_store';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    localMongoPath = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}


var mongoConnectionPath = (process.env.OPENSHIFT_MONGODB_DB_URL || localMongoPath);
mongoose.connect(mongoConnectionPath);
var db = mongoose.connection;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local');

app.use(multer());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(cookieParser());
app.use(session({
    secret: 'this is the secret',
    resave:true,
    saveUninitialized:true

    
}))

app.use(passport.initialize());
app.use(passport.session());
/** set path public */
app.use(express.static(__dirname + '/public'));

var UserSchema = require("./public/project/server/schema/user.schema.js")(app, mongoose, db);
var UserModel = mongoose.model("SUserModel", UserSchema);

passport.use(new LocalStrategy(
    function (username, password, done) {
        var credential = {
            username: username,
            password: password
        }
        UserModel.findOne(credential, function (err, user) {
            if(err) done(err);
            else if(user)   done(null, user);
            else    done(null, false);
        })
    })
);

passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(user, done){
    UserModel.findById(user._id, function(err, user){
        done(err, user);
    })
})

app.post('/login', passport.authenticate('local'), function(req, res){
    var user = req.user;
    res.json(user);
})

app.get('/loggedin', function(req, res){
    res.send(req.isAuthenticated()? req.user : 401);
})

app.get("/logout",  function (req, res) {
    console.log("logging out");
    req.logout();
    res.send(200);
});

app.post("/register", function(req, res){
    var newUser = req.body;
    var credential = {
        username: newUser.username,
        password: newUser.password
    }
    UserModel.findOne(credential, function(err, user){
        if(err) { return next(err); }
        else if(user){
            res.json(null);
            return;
        }
        else{
            UserModel.create(newUser, function(err, user){
                req.login(user, function(err){
                    if(err){
                        res.send(err)
                    }
                    res.json(user);
                })
            })
        }
    })
})

var auth = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    }
    else {
        next();
    }
};

/** connection to local or openshift */
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

 
require("./public/project/server/app.js")(app, mongoose, db, auth);


app.listen(port,ip);
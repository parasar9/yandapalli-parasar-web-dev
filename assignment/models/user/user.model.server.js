module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername : findUserByUsername,
        findFacebookUser : findFacebookUser,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser
    };
    return api;

    function findFacebookUser(userId) {
        return User.findOne({"facebook.id": userId});
    }


    function createUser(user) {
        return User.create(user);
    }


    function findUserById(userId) {
        return User.findById(userId);
    }


    function findUserByUsername(username) {
        return User.findOne({username: username});
    }


    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }


    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

     
    function updateUser(userId, user) {
        // delete user._id;
        return User.update({_id: userId},{
            $set: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        });
    }
};
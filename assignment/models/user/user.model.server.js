module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser
    };
    return api;

    //Creates a new user instance
    function createUser(user) {
        return User.create(user);
    }

    //Retrieves a user instance whose _id is equal to parameter userId
    function findUserById(userId) {
        return User.findById(userId);
    }

    //Retrieves a user instance whose username is equal to parameter username
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    //Retrieves a user instance whose username and password
    //are equal to parameters userId and password
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    //Removes user instance whose _id is equal to parameter userId
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    //Updates user instance whose _id is equal to parameter userId
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
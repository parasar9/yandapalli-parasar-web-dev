module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User =  mongoose.model("User",UserSchema);


  var api = {
      createUser : createUser,
      findUserById : findUserById,
      deleteUser : deleteUser,
      updateUser: updateUser,
      findUserByUsername: findUserByUsername,
      findUserByCredentials : findUserByCredentials,
      findAllUsers: findAllUsers

  };
    return api;

    function findUserById(userId){
        return User.findById({_id : userId});

    }
    function findAllUsers() {
        return User.find();
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return User
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }



    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function deleteUser(userId){
        return User.remove({_id: userId});
    }


    function createUser(user)
    {
        console.log("user.model.server.createUser()")
        console.log(user);
        return User.create(user);

    }
};
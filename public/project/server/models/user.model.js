
var q = require("q");

module.exports = function(app, mongoose, db) {

    var UserSchema = require("../schema/user.schema.js")(app, mongoose, db);
    var UserModel = mongoose.model("PUserModel", UserSchema);

    var api = {
        findById: FindById,
        update: Update,
        delete: Delete,
        findByUsername: FindByUsername,
        findVisiterById: FindVisiterById,

        addRecord: AddRecord,
        findRecordsByUserId: FindRecordsByUserId,
        findRecordById: FindRecordById,
        deleteRecord: DeleteRecord,
        updateRecord: UpdateRecord,

        goCheck: GoCheck,
        findAllHistoryByUserId: FindAllHistoryByUserId

    }
    return api;

    function  FindAllHistoryByUserId(userId){
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            deferred.resolve(user.history);
        })
        return deferred.promise;
    }

    function GoCheck(userId, history){
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            user.records = [];
            for(var i=0; i<history.length; i++)
                user.history.push(history[i]);

            user.save(function(err, user){
                deferred.resolve(user);
            })
        })
        return deferred.promise;
    }

    function AddRecord(userId, record){
        var deferred = q.defer();

        UserModel.findById(userId, function(err, user){
            if(user){
                user.records.push(record);
                user.save(function(err, user){
                    deferred.resolve(user.records);
                })
            }
            else
                deferred.resolve(null);
        })
        return deferred.promise;
    }

    function FindRecordsByUserId(userId){
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            deferred.resolve(user.records);
        })
        return deferred.promise;
    }

    function FindRecordById(userId, id){
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            var records = user.records;
            var record = null;
            for(var i=0; i<records.length; i++){
                if(records[i].id == id) {
                    record = records[i];
                    break;
                }
            }
            deferred.resolve(record);
        })
        return deferred.promise;
    }

    function DeleteRecord(userId, id){
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            var records = user.records;
            for(var i=0; i<records.length; i++) {
                if (records[i].id == id) {
                    records.splice(i, 1);
                    break;
                }
            }
            user.save(function(err, user){
                deferred.resolve(user.records);
            })
        })
        return deferred.promise;
    }

    function UpdateRecord(userId, id, record){
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            var records = user.records;
            for(var i=0; i<records.length; i++){
                if(records[i].id == id) {
                    records.splice(i,1, record);
                    break;
                }
            }
            user.save(function(err, user){
                deferred.resolve(user.records);
            })
        })
        return deferred.promise;
    }


    function Create(user) {
        var deferred = q.defer();
        UserModel.findOne({username:user.username}, function(err, doc){
            if(doc)
                deferred.resolve(null);
            else{
                UserModel.create(user, function(err, doc2){
                    deferred.resolve(doc2);
                })
            }
        })
        return deferred.promise;
    };

    function FindAll() {
        var deferred = q.defer();
        UserModel.find(function(err, users){
            deferred.resolve(users);
        })
        return deferred.promise;
    }
    ;

    function FindById(id) {
        var deferred = q.defer();
        UserModel.findById(id, function(err, user){
            deferred.resolve(user);
        })
        return deferred.promise;
    };

    function FindVisiterById(id) {
        var deferred = q.defer();
        UserModel.findById(id, function(err, user){
            if(user != null){
                user['username'] = null;
                user['password'] = null;
            }
            deferred.resolve(user);
        })
        return deferred.promise;
    };

    function Update(id, user) {
        var deferred = q.defer();
        UserModel.update({_id:id}, {$set: {
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password,
            gender: user.gender,
            email: user.email,
            phone: user.phone,
            image: user.image,
            age: user.age,
            address: user.address
        }}, function(err, num){
            UserModel.findById(id, function(err, user){
                deferred.resolve(user);
            })
        })
        return deferred.promise;
    };

    function Delete(id) {
        var deferred = q.defer();
        UserModel.findById(id).remove(function(err, num){
            deferred.resolve(null);
        })
        return deferred.promise;
    };

    function FindByUsername(username){
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user){
            deferred.resolve(user);
        })
        return deferred.promise;
    }

    function FindByCredentials(credentials){
        var username= credentials.username;
        var password= credentials.password;
        var deferred = q.defer();
        UserModel.findOne({username: username, password: password}, function(err, user){
            deferred.resolve(user);
        })
        return deferred.promise;
    }
}
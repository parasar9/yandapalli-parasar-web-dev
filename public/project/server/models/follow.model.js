var q = require("q");

module.exports = function(app, mongoose, db) {

    var FollowSchema = require("../schema/follow.schema.js")(app, mongoose, db);
    var FollowModel = mongoose.model("FollowModel", FollowSchema);

    var api = {
        addFollow: AddFollow,
        deleteFollow: deleteFollow,
        findFollowsByUserId: FindFollowsByUserId,
        deleteFollowsByUserId: DeleteFollowsByUserId
    }

    return api;

    function AddFollow(follow){
        var userId = follow.userId;
        var sellerId = follow.sellerId;

        var deferred = q.defer();
        FollowModel.findOne({userId: userId, sellerId: sellerId},function(err, f){
            if(!f){
                FollowModel.create(follow, function(err, follow){
                    console.log(follow);
                    deferred.resolve(follow)
                });
            }
            else
                deferred.resolve(f);
        })
        return deferred.promise;
    }

    function FindFollowsByUserId(userId){
        var deferred = q.defer();
        FollowModel.find({userId: userId}, function(err, followed){
            console.log(followed);
            deferred.resolve(followed);
        });
        return deferred.promise;
    }

    function deleteFollow(userId, id){
        var deferred = q.defer();
        FollowModel.findById(id).remove(function(err, num){
            FollowModel.find({userId: userId}, function(err, followed){
                deferred.resolve(followed);
            });
        });
        return deferred.promise;
    }

    function DeleteFollowsByUserId(userId){
        var deferred = q.defer();
        FollowModel.find({ $or:[ {'userId':userId}, {'sellerId':userId}]}).remove(function(err, num){
            deferred.resolve(num);
        });
        return deferred.promise;
    }
}
 
(function() {
    angular
        .module("EstoreApp")
        .factory("FollowService", FollowService)

    function FollowService($http, $q) {

        var followService = {
            addFollow: AddFollow,
            findFollowedByUserId: FindFollowedByUserId,
            deleteFollow: DeleteFollow
        }
        return followService;

        function AddFollow(follow) {
            var deferred = $q.defer();
            $http.post("/api/project/followed/", follow)
                .success(function (followed) {
                    deferred.resolve(followed);
                });
            return deferred.promise;
        }

        function FindFollowedByUserId(userId) {
            var deferred = $q.defer();
            $http.get("/api/project/followed/" + userId)
                .success(function (followed) {
                    deferred.resolve(followed);
                });
            return deferred.promise;
        }

        function DeleteFollow(userId, id){
            var deferred = $q.defer();
            $http.delete("/api/project/followed/" + id+ "/user/" + userId)
                .success(function (followed) {
                    deferred.resolve(followed);
                });
            return deferred.promise;
        }
    }
})();
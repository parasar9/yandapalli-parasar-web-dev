 

(function(){
    angular
        .module("EstoreApp")
        .factory("HistoryService", HistoryService)

    function HistoryService($http, $q){

        var historyService = {
            goCheck: GoCheck,
            findAllHistoryByUserId: FindAllHistoryByUserId,
        }

        return historyService;

        function GoCheck(userId, history){
            var deferred = $q.defer();
            $http.put("/api/project/goCheck/" + userId, history)
                .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function FindAllHistoryByUserId(userId){
            var deferred = $q.defer();
            $http.get("/api/project/user/" + userId + "/history")
                .success(function(history){
                    deferred.resolve(history);
                });
            return deferred.promise;
        }
    }

})();
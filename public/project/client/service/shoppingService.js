 
(function(){
    angular
        .module("EstoreApp")
        .factory("ShoppingService", ShoppingService)

    function ShoppingService($http, $q){

        var shoppingRecordService = {
            createShopping: CreateShopping,
            findShoppingsByUserId: FindShoppingsByUserId,
            findShoppingById: FindShoppingById,
            updateShoppingById: UpdateShoppingById,
            deleteShoppingById: DeleteShoppingById
        }

        return shoppingRecordService;

        function CreateShopping(record){
            var deferred = $q.defer();
            $http.post("/api/project/shopping", record)
                .success(function(records){
                    deferred.resolve(records);
                });
            return deferred.promise;
        }

        function FindShoppingsByUserId(userId){
            var deferred = $q.defer();
            $http.get("/api/project/user/" + userId + "/shoppings")
                .success(function(records){
                    deferred.resolve(records);
                });
            return deferred.promise;
        }

        function FindShoppingById(userId, id){
            var deferred = $q.defer();
            $http.get("/api/project/shopping/" + id + "/user/" + userId)
                .success(function(record){
                    deferred.resolve(record);
                });
            return deferred.promise;
        }

        function DeleteShoppingById(userId, id){
            var deferred = $q.defer();
            console.log()
            $http.delete("/api/project/shopping/" + id + "/user/" + userId)
                .success(function(records){
                    deferred.resolve(records);
                });
            return deferred.promise;
        }

        function UpdateShoppingById(userId, id, record){
            var deferred = $q.defer();
            $http.put("/api/project/shopping/" + id + "/user/" + userId, record)
                .success(function(records){
                    deferred.resolve(records);
                });
            return deferred.promise;
        }
    }
})();
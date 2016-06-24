

(function(){
    angular
        .module("EstoreApp")
        .factory("UserService", UserService)

    function UserService($http, $q){
        var userService = {
            login: Login,
            loggedin: Loggedin,
            googleAuth: GoogleAuth,
            logout: Logout,
            findUserById: FindUserById,
            findVisiterById: FindVisiterById,
            register: Register,
            deleteUserById: DeleteUserById,
            updateUser: UpdateUser
        }
        return userService;

        function FindUserById(id){
            var deferred = $q.defer();
            $http.get("/api/project/user/" + id)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function GoogleAuth(){
            var deferred = $q.defer();
            $http.get("/auth/google")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function FindVisiterById(id){
            var deferred = $q.defer();
            $http.get("/api/project/user/"+ id + "/visit")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function Login(username, password){
            var deferred = $q.defer();
            var credential = {
                username: username,
                password: password
            }
            $http.post("/login", credential)
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(data, status){
                    deferred.reject("The username or password is invalid");
                });
            return deferred.promise;
        }

        function Loggedin(){
            var deferred = $q.defer();
            $http.get("/loggedin")
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(data, status){
                    deferred.reject();
                });
            return deferred.promise;
        }

        function Logout(){
            var deferred = $q.defer();
            $http.get("/logout")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function FindAllUsers(){
            var deferred = $q.defer();
            $http.get("/api/project/user")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function Register(user){
            var deferred = $q.defer();
            $http.post("/register",user)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function DeleteUserById(id){
            var deferred = $q.defer();
            $http.delete("/api/project/user/"+id)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function UpdateUser(id, user){
            var deferred = $q.defer();
            $http.put("/api/project/user/"+id, user)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

    }
})();
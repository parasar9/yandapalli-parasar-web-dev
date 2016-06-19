(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser : createUser,
            login : login,
            logout : logout,
            findUserById : findUserById,
            loggedIn : loggedIn,
            register : register,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            unregister : unregister
        };

        return api;

        
        function createUser(username, password) {
            var newUser = {
                username: username,
                password: password
            };

            return $http.post("/api/user", newUser);
        }

        function login(username, password) {
            var newUser = {
                username: username,
                password: password
            };

            return $http.post("/api/login", newUser);
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url);
        }


         
        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);

        }

        function loggedIn() {
            return $http.get("/api/loggedIn");
        }

        function register(username, password) {
            var newUser = {
                username: username,
                password: password
            };

            return $http.post("/api/register", newUser);
        }

         
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        
        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

         
        function updateUser(userId, newUser) {
            var url = "/api/user/" + userId;
            return $http.put(url, newUser);
        }

       
        function unregister(userId) {
            var url = "/api/user/" + userId;
           
            return $http.delete(url);
        }
    }
})();


(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            unregister : unregister
        };

        return api;

        // adds the user parameter instance to the local users array
        function createUser(username, password) {
            var newUser = {
                username: username,
                password: password
            };

            return $http.post("/api/user", newUser);
        }

        // returns the user in local users array whose _id matches the userId parameter
        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);

        }

        // returns the user in local users array whose username matches the parameter username
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        // returns the user whose username and password match the username and password parameters
        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        // updates the user in local users array whose _id matches the userId parameter
        function updateUser(userId, newUser) {
            var url = "/api/user/" + userId;
            return $http.put(url, newUser);
        }

        // removes the user whose _id matches the userId parameter
        function unregister(userId) {
            var url = "/api/user/" + userId;
            // console.log(url);
            return $http.delete(url);
        }
    }
})();


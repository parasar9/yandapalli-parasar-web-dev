// project user service client
(function() {
    angular
        .module("BookShelfApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser : createUser,
            findUserById : findUserById,
            // findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            changePassword : changePassword
        };

        return api;

        // add new user
        function createUser(username, password) {
            var newUser = {
                username: username,
                password: password
            };

            return $http.post("/api/bookshelf_user", newUser);
        }

        // returns the user in local users array whose _id matches the userId parameter
        function findUserById(id) {
            var url = "/api/bookshelf_user/" + id;
            return $http.get(url);

        }

        // returns the user whose username and password match the username and password parameters
        function findUserByCredentials(username, password) {
            var url = "/api/bookshelf_user?username="+username+"&password="+password;
            return $http.get(url);
        }

        // updates the user in local users array whose _id matches the userId parameter
        function updateUser(userId, newUser) {
            var url = "/api/bookshelf_user/" + userId;
            return $http.put(url, newUser);
        }

        // removes the user whose _id matches the userId parameter
        function unregister(userId) {
            var url = "/api/bookshelf_user/" + userId;
            // console.log(url);
            return $http.delete(url);
        }

        function changePassword(userId, newPassword) {
            // console.log("client changePassword get called");
            var url = "/api/bookshelf_user/" + userId + "/change_password";
            // console.log(url);
            return $http.put(url, {newPassword: newPassword});
        }
    }
})();


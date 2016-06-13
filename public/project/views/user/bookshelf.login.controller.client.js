(function() {
    angular
        .module("BookShelfApp")
        .controller("LoginController", LoginController);

    function LoginController ($location, UserService) {
        var vm = this;

        vm.login = function loginWithCredentials(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(function (response) {
                    var user = response.data;
                    if (user._id) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.error = "User not found or wrong password";
                    }
                });


        }
    }

})();
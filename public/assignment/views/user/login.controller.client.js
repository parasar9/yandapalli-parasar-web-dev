(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController ($location, UserService) {
        var vm = this;

        vm.login = function loginWithCredentials(username, password) {
            if (username && password) {
                UserService
                    .login(username, password)
                    .then(
                        function (response) {
                        var user = response.data;
                        if (user && user._id) {
                            $location.url("/user/" + user._id);
                        } else {
                            vm.error = "User not found or wrong password ";
                        }
                        },
                        function () {
                            vm.error = "User not found or wrong password ";
                        });
            } else {
                vm.error = "Username and password should not be empty. ";
            }



        }
    }

})();
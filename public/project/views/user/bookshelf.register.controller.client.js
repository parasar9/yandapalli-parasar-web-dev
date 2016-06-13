(function() {
    angular
        .module("BookShelfApp")
        .controller("RegisterController", RegisterController);

    function RegisterController ($location, UserService) {
        var vm = this;
        vm.createNewUser = function createNewUser(username, password, veri_password) {
            if (username) {
                if (password === veri_password) {
                    UserService
                        .createUser(username, password)
                        .then(function (response) {
                            var user = response.data;
                            if (user._id) {
                                $location.url("/user/" + user._id);
                            } else {
                                vm.error = "Username already exists.";
                            }
                        });
                }
                else {
                    vm.error = "Password not consistent.";
                }
            }
            else {
                vm.error = "Username should not be empty. ";
            }
        }
    }

})();
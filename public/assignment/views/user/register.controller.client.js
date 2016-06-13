(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController ($location, UserService) {
        var vm = this;
        vm.createNewUser = function createNewUser(username, password, veri_password) {
            if (username && password && veri_password) {
                if (password === veri_password) {
                    UserService
                        .createUser(username, password)
                        .then(
                            function (response) {
                                var result = response.data;
                                if (result && result._id) {
                                    $location.url("/user/" + result._id);
                                } else {
                                    if (result && result.errors) {
                                        vm.error = "Username already exists. ";
                                    }
                                }
                            });
                    }
                    else {
                    vm.error = "Password not consistent.";
                    }
            }
            else {
                vm.error = "Username and password should not be empty. ";
            }
                    // var res = UserService.createUser(username, password);


        }
    }

})();
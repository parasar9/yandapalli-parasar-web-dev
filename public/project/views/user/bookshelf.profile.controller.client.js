(function() {
    angular
        .module("BookShelfApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($location, $routeParams, $timeout, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.changePassword = changePassword;

        var uid = $routeParams.userId;

        function init() {
            UserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = angular.copy(response.data);
                });
        }
        init();

        function changePassword(oldPassword, newPassword, veriNewPassword) {
            if (vm.user.password === oldPassword) {
                if (newPassword === veriNewPassword) {
                    UserService
                        .changePassword(uid, newPassword)
                        .then(
                            function () {
                                vm.success = "Password updated. Please login with your new password.";
                                $timeout(
                                    function () {
                                        $location.url("/login");
                                    },
                                    2000);

                            },
                            function () {
                                vm.error = "Update failed. ";
                            });
                }
                else {
                    vm.error = "New password not consistent. ";
                }
            }
            else {
                vm.error = "Wrong password. ";
            }
        }

        function updateUser(newUser) {
            UserService
                .updateUser(uid, newUser)
                .then(
                    function () {
                        vm.success = "User updated. ";
                    },
                    function () {
                        vm.error = "Update failed. ";
                    }
                );
        }

        function unregister() {
            UserService
                .unregister(uid)
                .then(
                    function () {
                        $location.url("/login");
                    },
                    function () {
                        vm.error = "Deregistration failed. ";
                    }
                );
        }

    }

})();
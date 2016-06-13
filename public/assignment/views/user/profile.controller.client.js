(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;

        var uid = $routeParams.uid;

        function init() {
            UserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = angular.copy(response.data);
                });


            // vm.user = angular.copy(UserService.findUserById(uid));
        }
        init();

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
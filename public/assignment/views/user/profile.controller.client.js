/* author @ parashar */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService,$location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;

        var userId = $routeParams.userId;

        function init() {
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();

        function updateUser(newUser) {
            UserService
                .updateUser(userId, newUser)
                .then(
                    function (response) {
                        vm.success = "Your profile was saved.";
                    },
                    function (error) {
                        vm.error = "Error saving profile."
                    });
        }

        function unregister() {
            UserService
                .deleteUser(userId)
                .then(
                    function () {
                        $location.url("/login");
                    },
                    function () {
                        vm.error="Unable to remove user";
                    }
                );
        }


    }
})();
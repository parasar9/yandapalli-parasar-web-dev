(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        var uid = $rootScope.currentUser._id;

        function init() {
            UserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = angular.copy(response.data);
                });


             
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                )
        }

        function updateUser(newUser) {
            UserService
                .updateUser(uid, newUser)
                .then(
                    function (response) {
                        vm.success = response.data;
                    },
                    function (err) {
                        vm.error = err.data;
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
                    function (err) {
                        vm.error = err.data;
                    }
                );
        }

    }

})();
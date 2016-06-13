(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController ($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;


        vm.createWebsite = function createWebsite(name, des){
            if (name) {
                WebsiteService
                    .createWebsite(vm.userId, name, des)
                    .then(
                        function () {
                            $location.url("/user/" + vm.userId + "/website");
                        },
                        function () {
                            vm.error = "Unable to create website.";
                        });

            } else {
                vm.error = "Website name should not be empty. ";
            }
        }
    }

})();




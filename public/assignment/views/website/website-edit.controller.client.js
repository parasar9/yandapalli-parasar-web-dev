(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController ($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        var webId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(webId)
                .then(function(response){
                    vm.web = angular.copy(response.data);
                });
        }
        init();

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(webId)
                .then(
                    function () {
                        $location.url("/user/" + userId + "/website");
                    },
                    function (err) {
                        vm.error = err.data;
                    });

        }

        function updateWebsite(newWeb) {
            if (newWeb.name) {
                WebsiteService
                    .updateWebsite(newWeb)
                    .then(
                        function (response) {
                            vm.success = response.data;
                        },
                        function (err) {
                            vm.error = err.data;
                        });
            } else {
                vm.error = "Website name should not be empty. ";
            }

        }

    }
})();




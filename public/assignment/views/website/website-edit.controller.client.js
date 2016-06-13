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
                    function () {
                        vm.error = "Unable to delete website.";
                    });

        }

        function updateWebsite(newWeb) {
            if (newWeb.name) {
                WebsiteService
                    .updateWebsite(newWeb)
                    .then(
                        function () {
                            vm.success = "Website updated. ";
                        },
                        function () {
                            vm.error = "Update failed. ";
                        });
            } else {
                vm.error = "Website name should not be empty. ";
            }

        }

    }
})();




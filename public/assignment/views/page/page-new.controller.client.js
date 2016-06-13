(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController ($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.webId = $routeParams.wid;

        vm.createPage = function createPage(name, title){
            if (name) {
                var newPage = PageService.createPage(vm.webId, name, title);
                if (newPage) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page");
                } else {
                    vm.error = "Unable to create page. ";
                }
            } else {
                vm.error = "Page name should not be empty. ";
            }

        }
    }


})();
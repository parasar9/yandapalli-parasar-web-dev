(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController ($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.webId = $routeParams.wid;


        function init() {
            PageService
                .findPageByWebsiteId(vm.webId)
                .then(function (response) {
                    vm.pages = angular.copy(response.data);
                });
        }
        init();
    }


})();






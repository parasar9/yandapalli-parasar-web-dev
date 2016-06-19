(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController ($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        var webId = $routeParams.wid;
        var pageId = $routeParams.pid;

        function init() {
            PageService
                .findPageById(pageId)
                .then(function (response) {
                    vm.page = angular.copy(response.data);
                });
        }
        init();
        
        vm.updatePage = function updatePage(page) {
            if (page.name) {
                PageService
                    .updatePage(pageId, page)
                    .then(
                        function (response) {
                            vm.success = response.data;
                        },
                        function (err) {
                            vm.error = err.data;
                        });
            } else {
                vm.error = "Page name should not be empty. ";
            }

        };
        
        vm.deletePage = function deletePage() {
            PageService
                .deletePage(pageId)
                .then(
                    function () {
                        $location.url("/user/" + vm.userId + "/website/" + webId + "/page");
                    },
                    function (err) {
                        vm.error = err.data;
                    });

        };
    }


})();
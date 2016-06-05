/* author @ parashar */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);
    
    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                });
        }
        init();

        function updatePage(newPage) {
            if(newPage.name) {
                PageService
                    .updatePage(vm.pageId, newPage)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        },
                        function (error) {
                            vm.error = "Error while updating page."
                        }
                    );
            }
            else {
                vm.error = " page name is required"
            }
        }

        function deletePage(){
            PageService
                .deletePage(vm.pageId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function (error) {
                        vm.error = "Unable to delete page";
                    }
                );
        }
    }
})();
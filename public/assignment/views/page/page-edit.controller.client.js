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
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(newPage) {
            if(newPage.name) {
                var result = PageService.updatePage(vm.pageId, newPage);
                if (result) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }
                else {
                    vm.error = "Error updating page details."
                }
            }
            else {
                vm.error = "Page name cannot be empty."
            }
        }

        function deletePage(){
            var result = PageService.deletePage(vm.pageId);
            if(result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Unable to delete page";
            }
        }
    }
})();




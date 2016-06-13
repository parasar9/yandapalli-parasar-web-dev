(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController ($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.webId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.type = $routeParams.type;

        vm.createWidget = function createWidget(content){
            if (content.name) {
                WidgetService
                    .createWidget(vm.type, content, vm.pageId)
                    .then(
                        function () {
                            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");
                        },
                        function () {
                            vm.error = "Unable to create widget. ";
                        });
            }
            else {
                vm.error = "Widget name should not be empty. ";
            }

        }

    }

})();








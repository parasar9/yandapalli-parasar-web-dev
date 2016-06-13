(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController ($location, $routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.webId = $routeParams.wid;
        vm.widgetId = $routeParams.wgid;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = angular.copy(response.data);
                });
        }
        init();

        vm.updateWidget = function updateWidget(wid) {
            if (wid.name) {
                WidgetService
                    .updateWidget(vm.widgetId, wid)
                    .then(
                        function () {
                            vm.success = "Widget updated. ";
                        },
                        function () {
                            vm.error = "Update failed. ";
                        });
            } else {
                vm.error = "Widget name should not be empty. ";
            }

        };

        vm.deleteWidget = function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(
                    function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");
                    },
                    function () {
                        vm.error = "Unable to delete the page. ";
                    });
        };

    }

})();








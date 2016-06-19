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
                if (vm.type === "HEADER") {
                    if (content.size >= 1 && content.size <= 6) {
                        WidgetService
                            .createWidget(vm.type, content, vm.pageId)
                            .then(
                                function () {
                                    $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");
                                },
                                function (err) {
                                    vm.error = err.data;
                                });
                    } else {
                        vm.error = "Size out of range. ";
                    }
                } else if (vm.type === "TEXT") {
                    if (content.rows > 0) {
                        WidgetService
                            .createWidget(vm.type, content, vm.pageId)
                            .then(
                                function () {
                                    $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");
                                },
                                function (err) {
                                    vm.error = err.data;
                                });
                    } else {
                        vm.error = "Number of rows should be positive. ";
                    }
                } else if (vm.type === "YOUTUBE") {
                    if (content.url) {
                        WidgetService
                            .createWidget(vm.type, content, vm.pageId)
                            .then(
                                function () {
                                    $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");
                                },
                                function (err) {
                                    vm.error = err.data;
                                });
                    } else {
                        vm.error = "Url should not be empty. ";
                    }
                } else {
                    WidgetService
                        .createWidget(vm.type, content, vm.pageId)
                        .then(
                            function () {
                                $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");
                            },
                            function (err) {
                                vm.error = err.data;
                            });
                }

            }
            else {
                vm.error = "Widget name should not be empty. ";
            }

        }

    }

})();








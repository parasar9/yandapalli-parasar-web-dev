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
                if (wid.widgetType === "HEADER") {
                    if (wid.size >= 1 && wid.size <= 6) {
                        WidgetService
                            .updateWidget(vm.widgetId, wid)
                            .then(
                                function (response) {
                                    vm.success = response.data;
                                },
                                function (err) {
                                    vm.error = err.data;
                                });
                    } else {
                        vm.error = "Size out of range. ";
                    }
                } else if (wid.widgetType === "TEXT") {
                    if (wid.rows > 0) {
                        WidgetService
                            .updateWidget(vm.widgetId, wid)
                            .then(
                                function (response) {
                                    vm.success = response.data;
                                },
                                function (err) {
                                    vm.error = err.data;
                                });
                    } else {
                        vm.error = "Number of rows should be positive. ";
                    }
                } else if (wid.widgetType === "YOUTUBE") {
                    if (wid.url) {
                        WidgetService
                            .updateWidget(vm.widgetId, wid)
                            .then(
                                function (response) {
                                    vm.success = response.data;
                                },
                                function (err) {
                                    vm.error = err.data;
                                });
                    } else {
                        vm.error = "Url should not be empty. ";
                    }

                } else {
                    WidgetService
                        .updateWidget(vm.widgetId, wid)
                        .then(
                            function (response) {
                                vm.success = response.data;
                            },
                            function (err) {
                                vm.error = err.data;
                            });
                }

            }
            else {
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
                    function (err) {
                        vm.error = err.data;
                    });
        };

    }

})();








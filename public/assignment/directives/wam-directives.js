(function () {
    angular.module("wamDirectives",[])
        .directive("widgetDirective", widgetDirective);

    function widgetDirective() {

        function widgetManipulate(scope, element, attribute) {
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find(".container")
                .sortable({
                    axis: "y",
                    handle: ".widget-handle",
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function (event, ui) {
                        endIndex = ui.item.index();
                        
                        scope.reorderWidget({start: startIndex, end: endIndex});
                        

                    }
                });
        }
            return {
                templateUrl: "./views/widget/widget-list-by-directive.view.client.html",
                scope: {
                    model: "=",
                    reorderWidget: "&"
                },
                link: widgetManipulate
            };
    }




})();
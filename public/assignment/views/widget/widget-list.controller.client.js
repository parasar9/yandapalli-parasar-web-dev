(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController ($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.webId = $routeParams.wid;

        vm.getSafeHtml = function getSafeHtml(wid) {
            return $sce.trustAsHtml(wid.text);
        };

        vm.getSafeUrl = function getSafeUrl(wid) {
            var urlParts = wid.url.split("/");
            var id = urlParts[urlParts.length-1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        };

        vm.reorderWidget = function reorderWidget(start, end) {
            WidgetService
                .reorderWidget(start, end, vm.pageId)
                .then(
                    function () {
                        init();
                    },
                    function () {
                        vm.error = "Reordering failed. ";
                    }
                );
            // console.log([start, end]);
        };


        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                    // $(".container-fluid").sortable({
                    //     axis: "y",
                    //     handle: ".widget-handle"});
                });
        }
        init();
        
        
    }

})();








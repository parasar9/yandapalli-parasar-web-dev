(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", WidgetChooseController);

    function WidgetChooseController ($routeParams) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.webId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

    }

})();








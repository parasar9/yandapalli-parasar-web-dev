(function() {
    angular
        .module("WebAppMaker")
        .controller("UpdateImageErrorController", UpdateImageErrorController);

    function UpdateImageErrorController ($routeParams) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.webId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        
    }

})();
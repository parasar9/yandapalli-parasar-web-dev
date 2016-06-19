(function() {
    angular
        .module("WebAppMaker")
        .controller("ImageErrorController", ImageErrorController);

    function ImageErrorController ($routeParams) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.webId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        
    }

})();
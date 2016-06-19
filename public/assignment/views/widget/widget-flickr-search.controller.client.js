(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.webId = $routeParams.wid;
        vm.widgetId = $routeParams.wgid;

        vm.searchPhotos = searchPhotos;
        vm.updatePhoto = updatePhoto;
        vm.getPhotoInfo = getPhotoInfo;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response){
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function getPhotoInfo(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.url = url;
        }

        function updatePhoto() {
            if (vm.url) {
                var photoWidget = {
                    width: "100%",
                    url: vm.url
                };
                WidgetService
                    .updateWidget(vm.widgetId, photoWidget)
                    .then(
                        function () {
                            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget/" + vm.widgetId);
                        },
                        function (err) {
                            vm.error = err.data;
                        });
            } else {
                vm.error = "URL should not be empty. ";
            }

        }

    }
})();
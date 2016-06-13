(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSelectController", FlickrImageSelectController);

    function FlickrImageSelectController($location, $routeParams, FlickrService, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.webId = $routeParams.wid;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
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

        function selectPhoto(name) {
            if (vm.url && name) {
                WidgetService
                    .createWidget("IMAGE", {name: name, url: vm.url, width: "100%"}, vm.pageId)
                    .then(
                        function () {
                            $location.url("/user/" + vm.userId + "/website/" + vm.webId + "/page/" + vm.pageId + "/widget");
                        },
                        function () {
                            vm.error = "Unable to select the photo. ";
                        }
                    );
            } else {
                vm.error = "URL and name should not be empty. ";
            }

        }


    }
})();
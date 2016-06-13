(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    

    function PageService($http) {

        var api = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage

        };
        return api;

        // adds the page parameter instance to the local pages array.
        // The new page's websiteId is set to the websiteId parameter
        function createPage(websiteId, name, title) {
            var newPage = {
                name: name,
                websiteId: websiteId,
                title: title
            };
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, newPage);
        }

        // retrieves the pages in local pages array whose websiteId matches the parameter websiteId
        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        // retrieves the page in local pages array whose _id matches the pageId parameter
        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        // updates the page in local pages array whose _id matches the pageId parameter
        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        // removes the page from local pages array whose _id matches the pageId parameter
        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();


/**
 * Created by Allen on 5/23/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        
        
        var api = {
            createWebsite : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite

        };
        return api;
        

        function createWebsite(userId, name, des) {
            var newWebsite = {
                developerId: userId,
                name: name,
                description: des
            };
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, newWebsite);
        }


        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }


        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }


        function updateWebsite(website) {
            var url = "/api/website/" + website._id;
            return $http.put(url, website);
        }

        
        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }
    }
})();





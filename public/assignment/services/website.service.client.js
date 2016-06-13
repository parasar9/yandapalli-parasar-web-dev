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
        
        // adds the website parameter instance to the local websites array.
        // The new website's developerId is set to the userId parameter.
        function createWebsite(userId, name, des) {
            var newWebsite = {
                developerId: userId,
                name: name,
                description: des
            };
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, newWebsite);
        }

        // retrieves the websites in local websites array whose developerId matches the parameter userId
        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }

        // retrieves the website in local websites array whose _id matches the websiteId parameter
        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        // updates the website in local websites array whose _id matches the websiteId parameter
        function updateWebsite(website) {
            var url = "/api/website/" + website._id;
            return $http.put(url, website);
        }

        // removes the website from local websites array whose _id matches the websiteId parameter
        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }
    }
})();





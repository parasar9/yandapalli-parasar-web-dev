(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    
    function WidgetService($http) {


        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            reorderWidget: reorderWidget,
            deleteWidget: deleteWidget,
            createWidget: createWidget

        };
        return api;


        function createWidget(type, content, pageId) {
            var tmpTypeObj = {
                type: type,
                content: content
            };
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, tmpTypeObj);
        }

        


        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }


        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }


        function updateWidget(widgetId, widget) {
            var url = "/api/widget/"+ widgetId;
            return $http.put(url, widget);
        }


        function reorderWidget(start, end, pageId) {
            var url = "/api/widget_reorder?start=" + start + "&end=" + end + "&pageId=" + pageId;
            return $http.put(url);
        }

        
        function deleteWidget(widgetId) {
            var url = "/api/widget/"+ widgetId;
            return $http.delete(url);
        }
    }
})();




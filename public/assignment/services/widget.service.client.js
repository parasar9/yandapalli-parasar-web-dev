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

        // adds the widget parameter instance to the local widgets array.
        // The new widget's pageId is set to the pageId parameter
        function createWidget(type, content, pageId) {
            var tmpTypeObj = {
                type: type,
                content: content
            };
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, tmpTypeObj);
        }

        

        // retrieves the widgets in local widgets array whose pageId matches the parameter pageId
        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        // retrieves the widgets in local widgets array whose _id matches the widgetId parameter
        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        // updates the widget in local widgets array whose _id matches the widgetId parameter
        // otherwise return false
        function updateWidget(widgetId, widget) {
            var url = "/api/widget/"+ widgetId;
            return $http.put(url, widget);
        }

        // reorder the widgets corresponding to 'sortable' event
        function reorderWidget(start, end, pageId) {
            var url = "/api/widget_reorder?start=" + start + "&end=" + end + "&pageId=" + pageId;
            return $http.put(url);
        }

        // removes the widget from local widgets array whose _id matches the widgetId parameter
        function deleteWidget(widgetId) {
            var url = "/api/widget/"+ widgetId;
            return $http.delete(url);
        }
    }
})();




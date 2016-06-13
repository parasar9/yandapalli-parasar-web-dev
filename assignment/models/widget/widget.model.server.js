module.exports = function () {

    var mongoose = require("mongoose");
    var widgetSchema = require("./widget.schema.server")();
    var widget = mongoose.model("Widget", widgetSchema);

    var api = {
        // uploadImage: uploadImage,
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        reorderWidget: reorderWidget,
        deleteWidget: deleteWidget
    };
    return api;

    function findAllWidgetsForPage(pageId) {
        return widget.find({pageId: pageId});
    }

    function createWidget(type, content, pageId) {
        return widget
            .find({pageId: pageId})
            .then(
                function (widgets) {
                    var len = widgets.length;
                    switch (type) {
                        case "HEADER":
                            createHeader(content, pageId, len);
                            break;
                        case "IMAGE":
                            createMedia(content, pageId, "IMAGE", len);
                            break;
                        case "YOUTUBE":
                            createMedia(content, pageId, "YOUTUBE", len);
                            break;
                        case "HTML":
                            createHtml(content, pageId, len);
                            break;
                        case "TEXT":
                            createText(content, pageId, len);
                            break;
                        default:
                            createHtml(content, pageId, len);
                            break;
                    }
                }
            );
    }

    // creates Html header on the given page indicated by pageId
    function createHeader(content, pageId, len) {
        return widget.create(
            {
                pageId: pageId,
                widgetType: "HEADER",
                size: content.size,
                text: content.text,
                name: content.name,
                order: len
            }
        );
    }

    // creates image or video on the given page indicated by pageId
    function createMedia(content, pageId, media, len) {
        return widget.create(
            {
                pageId: pageId,
                widgetType: media,
                url: content.url,
                width: content.width,
                name: content.name,
                order: len
            }
        );
    }

    // creates Html content on the given page indicated by pageId
    function createHtml(content, pageId, len) {
        return widget.create(
            {
                pageId: pageId,
                widgetType: "HTML",
                text: content.text,
                name: content.name,
                order: len
            }
        );
    }

    // creates Html content on the given page indicated by pageId
    function createText(content, pageId, len) {
        return widget.create(
            {
                pageId: pageId,
                widgetType: "TEXT",
                text: content.text,
                rows: content.rows,
                placeholder: content.placeholder,
                formatted: content.formatted,
                name: content.name,
                order: len
            }
        );
    }

    function findWidgetById(widgetId) {
        return widget.findOne({_id: widgetId});
    }

    function deleteWidget(widgetId) {
        return widget.remove({_id: widgetId});
    }

    function updateWidget(widgetId, newWidget) {
        delete newWidget._id;
        return widget.update({_id: widgetId},{
            $set: newWidget
        });
    }

    function reorderWidget(start, end, pageId) {
        return widget
            .find({pageId: pageId})
            .then(
                function (widgets) {
                    for (var i in widgets) {
                        var tmpWidget = widgets[i];
                        if (start >= end) {
                            if (tmpWidget.order < start && tmpWidget.order >= end) {
                                tmpWidget.order++;
                                tmpWidget.save(function () {
                                });
                            } else if (tmpWidget.order === start) {
                                tmpWidget.order = end;
                                tmpWidget.save(function () {
                                });
                            }
                        } else {
                            if (tmpWidget.order > start && tmpWidget.order <= end) {
                                tmpWidget.order--;
                                tmpWidget.save(function () {
                                });
                            } else if (tmpWidget.order === start) {
                                tmpWidget.order = end;
                                tmpWidget.save(function () {
                                });
                            }
                        }
                    }
                });
    }
};
module.exports = function(app, models) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgetModel = models.widgetModel;

    app.post("/api/page/:pageId/widget", createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post ("/api/new/upload", upload.single('myFile'), uploadNewImage);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/widget_reorder", reorderWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function reorderWidget(req, res) {
        start = parseInt(req.query.start);
        end = parseInt(req.query.end);
        pageId = req.query.pageId;
        widgetModel
            .reorderWidget(start, end, pageId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );
    }

    function uploadNewImage(req, res) {
        var widgetName = req.body.widgetName;
        var userId = req.body.userId;
        var websiteId = req.body.webId;
        var pageId = req.body.pageId;
        var myFile = req.file;
        if (myFile && widgetName) {
            var width = req.body.width;
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename; // new file name in upload folder
            var path = myFile.path; // full path of uploaded file
            var destination = myFile.destination; // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            var format = originalname.split(".");
            format = format[format.length - 1];

            var newPic = {
                name: widgetName,
                url: "/uploads/" + filename,
                width: "100%"
            }

            widgetModel
                .createWidget("IMAGE", newPic, pageId)
                .then(
                    function () {
                        res.redirect("/assignment/#/user/"+ userId + "/website/" + websiteId + "/page/" +pageId + "/widget");
                    },
                    function () {
                        res.redirect("/assignment/#/user/"+ userId + "/website/" + websiteId + "/page/" +pageId + "/widget/new/IMAGE");
                    }
                )
        } else {
            res.redirect("/assignment/#/user/"+ userId + "/website/" + websiteId + "/page/" +pageId + "/widget/new/IMAGE");
        }
    }

    function uploadImage (req, res) {
        // console.log(req.body);
        // console.log(req.file);
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.webId;
        var pageId = req.body.pageId;
        var widgetName = req.body.widgetName;
        var myFile = req.file;
        if (myFile && widgetName) {
            var width = req.body.width;
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename; // new file name in upload folder
            var path = myFile.path; // full path of uploaded file
            var destination = myFile.destination; // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            var format = originalname.split(".");
            format = format[format.length - 1];

            var newPic = {
                name: widgetName,
                url: "/uploads/" + filename,
                width: "100%"
            };

            widgetModel
                .updateWidget(widgetId, newPic)
                .then(
                    function () {
                        res.redirect("/assignment/#/user/"+ userId + "/website/" + websiteId + "/page/" +pageId + "/widget");
                    },
                    function () {
                        res.redirect("/assignment/#/user/"+ userId + "/website/" + websiteId + "/page/" +pageId + "/widget/" + widgetId);
                    }
                )
        } else {
            res.redirect("/assignment/#/user/"+ userId + "/website/" + websiteId + "/page/" +pageId + "/widget/" + widgetId);
        }
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var type = req.body.type;
        var content = req.body.content;
        widgetModel
            .createWidget(type, content, pageId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );
    }
    
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (response) {
                    res.send(response);
                },
                function () {
                    res.sendStatus(404);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (response) {
                    res.json(response);
                },
                function () {
                    res.sendStatus(404);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(404);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(404);
                }
            );
    }


};
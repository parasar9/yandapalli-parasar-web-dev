module.exports = function(app, models) {

    var pageModel = models.pageModel;
    
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        pageModel
            .createPage(newPage)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (response) {
                    res.send(response);
                },
                function () {
                    res.sendStatus(404);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (response) {
                    res.send(response);
                },
                function () {
                    res.sendStatus(404);
                }
            );
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pageId, page)
            .then(
                function () {
                    res.status(200).send("Page updated. ");
                },
                function () {
                    res.status(404).send("Update failed. ");
                }
            );

    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.status(404).send("Unable to delete the page. ");
                }
            );
    }


};
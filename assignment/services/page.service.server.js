/*
created by @parashar Yandapalli
 */
module.exports = function (app,models) {
    var pageModel = models.pageModel;

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var newPage = req.body;

        pageModel
            .createPage(websiteId, newPage)
            .then(
                function (page) {
                    console.log(page);
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                    console.log(pages);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }
    
    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(pid, page)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .deletePage(pageId)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

};
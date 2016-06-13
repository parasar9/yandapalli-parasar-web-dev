module.exports = function(app, models) {

    var websiteModel = models.websiteModel;
    
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    
    function createWebsite(req, res) {
        var newWebsite = req.body;
        websiteModel
            .createWebsite(newWebsite)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );
    }
    
    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findWebsitesByUser(userId)
            .then(
                function (response) {
                    res.send(response);
                },
                function () {
                    res.sendStatus(404);
                }
            );
    }
    
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (web) {
                    res.json(web);
                },
                function () {
                    res.sendStatus(404);
                }
            );
    }
    
    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            );
    }
    
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function () {
                    res.sendStatus(400);
                }
            )
    }


};
module.exports = function () {

    var mongoose = require("mongoose");
    var pageSchema = require("./page.schema.server")();
    var page = mongoose.model("Page", pageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        deletePage: deletePage,
        updatePage: updatePage
    };
    return api;

    function createPage(newPage) {
        return page.create(newPage);
    }

    function findAllPagesForWebsite(webId) {
        return page.find({websiteId: webId});
    }

    function findPageById(pageId) {
        return page.findOne({_id: pageId});
    }

    function deletePage(pageId) {
        return page.remove({_id: pageId});
    }

    function updatePage(pageId, newPage) {
                return page.update({_id: pageId},{
            $set: {
                name: newPage.name,
                title: newPage.title
            }
        });
    }

};
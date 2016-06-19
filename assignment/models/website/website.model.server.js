module.exports = function () {

    var mongoose = require("mongoose");
    var websiteSchema = require("./website.schema.server")();
    var website = mongoose.model("Website", websiteSchema);

    var api = {
        createWebsite: createWebsite,
        findWebsitesByUser: findWebsitesByUser,
        findWebsiteById: findWebsiteById,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite
    };
    return api;


    function createWebsite(newWebsite) {
        return website.create(newWebsite);
    }


    function findWebsitesByUser(userId) {
        return website.find({developerId: userId});
    }


    function findWebsiteById(websiteId) {
        return website.findOne({_id: websiteId});
    }


    function deleteWebsite(websiteId) {
        return website.remove({_id: websiteId});
    }
    

    function updateWebsite(websiteId, web) {
        
        return website.update({_id: websiteId},{
            $set: {
                name: web.name,
                description: web.description
            }
        });
    }

};
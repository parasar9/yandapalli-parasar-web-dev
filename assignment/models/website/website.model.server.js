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

    //Creates a new website instance for user whose _id is userId
    function createWebsite(newWebsite) {
        return website.create(newWebsite);
    }

    //Retrieves all website instances for user whose _id is userId
    function findWebsitesByUser(userId) {
        return website.find({developerId: userId});
    }

    //Retrieves single website instance whose _id is websiteId
    function findWebsiteById(websiteId) {
        return website.findOne({_id: websiteId});
    }

    //Removes website instance whose _id is websiteId
    function deleteWebsite(websiteId) {
        return website.remove({_id: websiteId});
    }
    
    //Updates website instance whose _id is websiteId
    function updateWebsite(websiteId, web) {
        // delete user._id;
        return website.update({_id: websiteId},{
            $set: {
                name: web.name,
                description: web.description
            }
        });
    }

};
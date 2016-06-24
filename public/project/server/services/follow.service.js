
module.exports = function(app, model, auth) {

    app.post("/api/project/followed/", auth, AddFollow);
    app.get("/api/project/followed/:userId", auth, FindFollowedByUserId);
    app.delete("/api/project/followed/:id/user/:userId", auth, DeleteFollow);

    function AddFollow(req, res){
        var follow = req.body;
        model.addFollow(follow).then(function(followed){
            res.json(followed)
        });
    }
    function FindFollowedByUserId(req, res){
        var userId = req.params.userId;
        model.findFollowsByUserId(userId).then(function(followed){
            res.json(followed)
        });
    }

    function DeleteFollow(req, res){
        var userId = req.params.userId;
        var id = req.params.id;
        model.deleteFollow(userId, id).then(function(followed){
            res.json(followed)
        });
    }
}
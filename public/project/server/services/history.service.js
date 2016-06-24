
module.exports = function(app, model, auth) {

    app.put("/api/project/goCheck/:userId", auth, GoCheck);
    app.get("/api/project/user/:userId/history", auth, FindAllHistoryByUserId);

    function GoCheck(req, res){
        var userId = req.params.userId;
        var history = req.body;

        model.goCheck(userId, history).then(function(user){
            res.json(user);
        });
    }
    function FindAllHistoryByUserId(req, res){
        var userId = req.params.userId;
        model.findAllHistoryByUserId(userId).then(function(history){
            res.json(history)
        });
    }
}
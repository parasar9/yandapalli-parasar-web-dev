module.exports = function(app, model, auth) {

    app.post("/api/project/shopping", auth, CreateShopping);
    app.get("/api/project/user/:userId/shoppings", auth, FindShoppingsByUserId);
    app.get("/api/project/shopping/:id/user/:userId", auth, FindShoppingById);
    app.put("/api/project/shopping/:id/user/:userId", auth, UpdateShoppingById);
    app.delete("/api/project/shopping/:id/user/:userId", auth, DeleteShoppingById);

    function CreateShopping(req, res) {
        var record = req.body;
        var userId = record.userId;
        model.addRecord(userId, record).then(function(records){
            res.json(records);
        });
    }

    function FindShoppingsByUserId(req, res) {
        var userId = req.params.userId;
        model.findRecordsByUserId(userId).then(function(records){
            res.json(records);
        })
    }

    function FindShoppingById(req, res) {
        var id = req.params.id;
        var userId = req.params.userId;
        model.findRecordById(userId, id).then(function(record){
            res.json(record)
        });
    }

    function UpdateShoppingById(req, res) {
        var id = req.params.id;
        var userId = req.params.userId;
        var record = req.body;
        model.updateRecord(userId, id, record).then(function(records){
            res.json(records)
        });
    }

    function DeleteShoppingById(req, res) {
        var id = req.params.id;
        var userId = req.params.userId;
        model.deleteRecord(userId, id).then(function(records){
            res.json(records);
        });
    }
}
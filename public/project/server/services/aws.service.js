 
var aws = require("aws-lib");
ec2 = aws.createEC2Client("AKIAIUXBFKIOQAQ2M3XA", "1KslRqCqP3pUMl0dI/y0d5pi5BFVdWNn1+yqCEg6");
var prodAdv = aws.createProdAdvClient("AKIAIUXBFKIOQAQ2M3XA", "1KslRqCqP3pUMl0dI/y0d5pi5BFVdWNn1+yqCEg6", "webdevparasar-20");

module.exports = function(app) {
    app.get("/api/search/books/:keyword", SearchBooks);
    function SearchBooks(req, res){
        var keyword = req.params.keyword;
        var options = { SearchIndex: "Books", Keywords: keyword , ResponseGroup: "ItemAttributes,Offers,Images,Reviews" };
        prodAdv.call("ItemSearch", options, function (err, items) {
            res.json(items);
        });
    }
}


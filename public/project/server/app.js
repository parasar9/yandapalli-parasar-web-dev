module.exports = function(app, mongoose, db, auth) {

    var userModel = require("./models/user.model.js")(app, mongoose, db);
    var bookModel = require("./models/book.model.js")(app, mongoose, db);
    var commentModel = require("./models/comment.model.js")(app, mongoose, db);
    var followModel = require("./models/follow.model.js")(app, mongoose, db);

    require("./services/user.service.js")(app, userModel, bookModel, commentModel, followModel, auth);
    require("./services/book.service.js")(app, bookModel, commentModel, auth);
    require("./services/follow.service.js")(app, followModel, auth);
    require("./services/comment.service.js")(app, commentModel, auth);
    require("./services/shopping.service.js")(app, userModel, auth);
    require("./services/history.service.js")(app, userModel, auth);
    require("./services/aws.service.js")(app);

}


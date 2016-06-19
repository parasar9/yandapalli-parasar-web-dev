module.exports = function () {

    // var mongoose = require("mongoose");
    // // for localhost
    // mongoose.connect('mongodb://localhost/CS5610summer1');
    //
    // // this works for remote, activate before push to remote
    // // var connectionString = 'mongodb://127.0.0.1:27017/test';
    //
    // if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    //     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    //         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    //         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    //         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    //         process.env.OPENSHIFT_APP_NAME;
    // }
    //
    // mongoose.connect(connectionString);

    var models = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()

    };
    return models;
};
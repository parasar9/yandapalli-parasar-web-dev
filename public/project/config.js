(function() {
    angular
        .module("BookShelfApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home.html"
            })
            .when("/home/:userId", {
                templateUrl: "home.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: "home.html"
            })
            // .when("/logo", {
            //     templateUrl: "img/logo.jpg"
            // })
            .when("/login", {
                templateUrl: "views/user/bookshelf.login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/bookshelf.register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
                templateUrl: "views/user/bookshelf.profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:userId/change_password", {
                templateUrl: "views/user/bookshelf.change.password.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:userId/book", {
                templateUrl: "views/book/bookshelf.my_book.view.client.html",
                controller: "MyBookController",
                controllerAs: "model"
            })
            .when("/user/:userId/book/:bookId", {
                templateUrl: "views/book/bookshelf.book_detail.view.client.html",
                controller: "BookDetailController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            })

    }
})();




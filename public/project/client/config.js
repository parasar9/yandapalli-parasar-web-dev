angular
    .module("EstoreApp")
    .config(Config);

     function Config($routeProvider) {
     $routeProvider
		.when('/home', {
            templateUrl: 'views/home/home.view.html'
         })
        .when('/search', {
            templateUrl: 'views/search/search.view.html',
			controller: 'SearchController'
        })
        .when('/login', {
            templateUrl: 'views/login/login.view.html',
            controller: 'LoginController'
        })
		.when('/reg', {
            templateUrl: 'views/register/register.view.html',
            controller: 'RegisterController'
        })
         .when('/shoppingcart', {
             templateUrl: 'views/shopppingCart/shoppingcart.view.html',
             controller:'ShoppingCartController',
             resolve : {
                 loggedin: Loggedin
             }
         })
         .when('/shoppingrecord', {
             templateUrl: 'views/shopppingRecord/shoppingrecord.view.html',
             controller:'ShoppingRecordController',
             resolve : {
                 loggedin: Loggedin
             }
         })
         .when('/product', {
             templateUrl: 'views/product/product.view.html',
             controller:'ProductController'
         })
         .when('/profile', {
             templateUrl: 'views/profile/profile.view.html',
             controller:'ProfileController',
             resolve : {
                 loggedin: Loggedin
             }
         })
         .when('/editUser', {
             templateUrl: 'views/register/register.view.html',
             controller: 'EditUserController',
             resolve : {
                 loggedin: Loggedin
             }
         })
         .when('/seller', {
             templateUrl: 'views/seller/seller.view.html',
             controller: 'SellerController',
             resolve : {
                 loggedin: Loggedin
             }
         })
         .when('/visit', {
             templateUrl: 'views/seller/seller.view.html',
             controller: 'VisitController',
         })
         .when('/secondhand', {
             templateUrl: 'views/secondhand/secondhand.view.html',
             controller: 'SecondHandController',
         })
        .otherwise({
             redirectTo: '/home'
         });
    }

function Loggedin ($rootScope, $location, UserService) {
    UserService.loggedin().then(function(user){
        $rootScope.user = user;
    }, function(err){
        $location.url('/login');
        alert('Please login first');
    })
}

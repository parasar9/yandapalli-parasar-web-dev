 
angular
    .module("EstoreApp")
    .controller("VisitController", VisitController);

function VisitController ($scope, $location, $rootScope, $cookies, UserService, BookService, FollowService) {

    GetSeller($cookies.get('seller'));
    $scope.location = $location;
    $scope.enter = Enter;
    $scope.rate = Rate;
    $scope.follow = Follow;

    function GetSeller(sellerId){
        UserService.findVisiterById(sellerId).then(function(seller){
            $scope.user = seller;
            RenderBooks();
        });
    }

    function Rate(rate, threshold){
        if(Math.round(rate) >= threshold)
            return "glyphicon glyphicon-star star";

        else
            return "glyphicon glyphicon-star-empty star";
    }

    function RenderBooks(){
        BookService.findBooksBySellerId($scope.user._id).then(function(books){
            $scope.books = books;
        })
    }

    function Enter(bookId){
        BookService.findBookById(bookId).then(function(book){
            if(!book)
                alert('sorry, this book has been removed off the shell');
            else{
                $cookies.putObject('book', book._id);
                $location.path("/product");
            }
        });
    }

    function Follow(seller){

        UserService.loggedin().then(function(user) {
            $rootScope.user = user;
            var name = seller.firstname
            var follow = {
                sellerId: seller._id,
                sellerName: name,
                sellerImage: seller.image,
                userId: user._id
            }
            FollowService.addFollow(follow).then(function (follows) {
                $location.path("/profile");
            });
        },function(err){
            alert('Please login first');
        });
    }

}

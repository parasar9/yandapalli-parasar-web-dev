 

var user = null;

angular
    .module("EstoreApp")
    .controller("SecondHandController", SecondHandController);

function SecondHandController ($scope, $location, $rootScope, $cookies, UserService, BookService, ShoppingService) {

    $scope.enterBook = EnterBook;
    $scope.buyBook = BuyBook;
    $scope.rate = Rate;
    $scope.enterSeller = EnterSeller;

    RenderSellerBooks()

    function RenderSellerBooks(){
        BookService.getSellerBooks().then(function(books){
            $scope.books = books;
        });
    }

    function Rate(rate, threshold){
        if(Math.round(rate) >= threshold)
            return "glyphicon glyphicon-star star";

        else
            return "glyphicon glyphicon-star-empty star";
    }

    function EnterSeller(sellerId){
        $cookies.put('seller', sellerId);
        $location.path('/visit');
    }

    function BuyBook(book){
        UserService.loggedin().then(function(user){
            $rootScope.currentUser = user;
            BookService.createBook(book).then(function (book) {
                var record= {
                    image: book.image,
                    quantity: 1,
                    bookId: book._id,
                    userId: user._id,
                    title: book.title,
                    price: book.price,
                    rating: book.rating
                }
                ShoppingService.createShopping(record).then(function(records){
                    $rootScope.user = user;
                    $location.path("/shoppingcart");
                })
            });
        }, function(err){
            alert('Please login first');
        })
    }

    function EnterBook(book){
        $cookies.putObject('book', book._id);
        $location.path('/product');
    }

}

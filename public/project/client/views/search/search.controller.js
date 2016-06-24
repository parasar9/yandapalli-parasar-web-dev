
var user = null;

angular
    .module("EstoreApp")
    .controller("SearchController", SearchController);

function SearchController ($scope,$location, $rootScope, $cookies, UserService, BookService, ShoppingService) {

    $scope.searched = false;
    $scope.search = Search;
    $scope.enterBook = EnterBook;
    $scope.buyBook = BuyBook;
    $scope.rate = Rate;
    $scope.generateRating = GenerateRating;

    function GenerateRating(){
        return 2 + Math.random() * 3;
    }

    function Rate(rate, threshold){
        if(Math.round(rate) >= threshold)
            return "glyphicon glyphicon-star star";

        else
            return "glyphicon glyphicon-star-empty star";
    }


    function MakeBook(item){
        var book = {
            image: item.MediumImage['URL'],
            rating: item.rating,
            asin: item['ASIN'],
            title: item['ItemAttributes']['Title'],
            author: item['ItemAttributes']['Author'],
            publisher: item['ItemAttributes']['Manufacturer'],
        }

        price = item['ItemAttributes']['ListPrice'];
        if (price == undefined || price.length == 0)
            book.price = "$10.00";
        else
            book.price = price['FormattedPrice'];
        if (book.asin == undefined || book.asin.length == 0)
            book.asin = guid().substring(0, 10);
        return book;
    }

    function BuyBook(item){
        UserService.loggedin().then(function(user){
            $rootScope.currentUser = user;
            var book = MakeBook(item);
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

    function EnterBook(item){
        var book = MakeBook(item);
        BookService.createBook(book).then(function(res){
            $cookies.putObject('book', res._id);
            $location.path('/product');
        });
    }

    function Search(keyword){
        if(keyword == undefined || keyword.length == 0)
            alert("please neter the keyword");
        else {
            BookService.searchBooks(keyword).then(function(res){
                var ItemsList = res['Items'];
                $scope.items = ItemsList['Item'];
                $scope.searched = true;
            })
        }
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

}
	
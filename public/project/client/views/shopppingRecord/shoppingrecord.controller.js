angular
    .module("EstoreApp")
    .controller("ShoppingRecordController", ShoppingRecordController);

var user;

function ShoppingRecordController ($scope, $location, $rootScope, $cookies, HistoryService, BookService) {

    user = $rootScope.user;
    RenderHistory();
    $scope.enterBook = EnterBook;
    $scope.rate = Rate;


    function Rate(rate, threshold){
        if(Math.round(rate) >= threshold)
            return "glyphicon glyphicon-star star";

        else
            return "glyphicon glyphicon-star-empty star";
    }


    function RenderHistory(){
        HistoryService.findAllHistoryByUserId(user._id).then(function(history){
            console.log(history);
            $scope.history = history;
        });
    }

    function EnterBook(bookId){
        BookService.findBookById(bookId).then(function(book){
            if(!book)
                alert('sorry, this book has been removed off the shell');
            else{
                $cookies.putObject('book', book);
                $location.path("/product");
            }
        });
    }
}
	
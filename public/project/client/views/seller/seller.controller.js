angular
    .module("EstoreApp")
    .controller("SellerController", SellerController);

function SellerController ($scope, $location, $rootScope, $cookies, ngDialog, UserService, BookService) {

    $scope.user = $rootScope.user;
    $scope.location = $location;
    RenderBooks();

    $scope.enter = Enter;
    $scope.removeUser = RemoveUser;
    $scope.editUser = EditUser;
    $scope.addBook = AddBook;
    $scope.removeBook = RemoveBook;
    $scope.editBook = EditBook;
    $scope.rate = Rate;

    function Rate(rate, threshold){
        if(Math.round(rate) >= threshold)
            return "glyphicon glyphicon-star star";

        else
            return "glyphicon glyphicon-star-empty star";
    }

    function AddBook(){
        ngDialog.openConfirm({
            template: 'views/seller/dialog/dialog.view.html',
            controller: 'SellerDialogController',
            className: 'ngdialog-theme-default ngdialog-theme-custom',
            scope : $scope,
            data: {
                sellerId: $scope.user._id,
                sellerName: $scope.user.username
            }
        }).then(null, function(books){
            if(books != undefined)
                $scope.books = books;
        })
    }

    function RemoveBook(sellerId, id){
        BookService.removeBook(sellerId, id).then(function(books){
            $scope.books = books;
        })
    }

    function EditBook(book){
        ngDialog.openConfirm({
            template: 'views/seller/dialog/dialog.view.html',
            controller: 'SellerDialogController',
            className: 'ngdialog-theme-default ngdialog-theme-custom',
            scope : $scope,
            data: {
                book: JSON.parse(JSON.stringify(book))
            }
        }).then(null, function(books){
            if(books != undefined)
                $scope.books = books;
        })
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

    function RemoveUser(){
        var id = $scope.user._id;
        UserService.deleteUserById(id).then(function(user){
            $location.path("/home");
        })
    }

    function EditUser() {
        $rootScope.user = $scope.user;
        $location.path("/editUser");
    }
}

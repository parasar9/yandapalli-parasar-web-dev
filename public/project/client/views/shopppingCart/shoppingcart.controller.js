angular
    .module("EstoreApp")
    .controller("ShoppingCartController", ShoppingCartController);

var user;

function ShoppingCartController ($scope, $location, $rootScope, $cookies, BookService, ShoppingService, HistoryService) {
    $scope.deleteRecord = DeleteRecord;
    $scope.enterBook = EnterBook;
    $scope.change = EditRecord;
    $scope.goCheck = GoCheck;
    $scope.rate = Rate;
    RenderRecord();

    function Rate(rate, threshold){
        if(Math.round(rate) >= threshold)
            return "glyphicon glyphicon-star star";

        else
            return "glyphicon glyphicon-star-empty star";
    }

    function GetTotal(records){
        var total = 0.0;
        if(records != undefined){
            for(var i=0; i<records.length; i++){
                var m = records[i].price.substring(1, records[i].length);
                var n = records[i].quantity;
                total += n * Number(m);
            }
        }

        $scope.total = '$' + total;

    }

    function EditRecord(record){

        if(record.quantity == undefined || record.quantity.length == 0)
            return;
        else if(record.quantity <= 0 || record.quantity % 1 != 0)
            alert('please input a valid quantity');
        else{
            ShoppingService.updateShoppingById(record.userId, record._id, record)
                .then(function(records){
                    $scope.records = records;
                    GetTotal(records);
                })
        }
    }

    function RenderRecord(){
        user = $rootScope.user;
        ShoppingService.findShoppingsByUserId(user._id).then(function (records) {
            $scope.records = records;
            GetTotal(records);
        });

    }

    function DeleteRecord(record){
        ShoppingService.deleteShoppingById(record.userId, record._id).then(function(records){
            $scope.records = records;
            GetTotal(records);
        });
    }

    function EnterBook(bookId){
        console.log(bookId)
        BookService.findBookById(bookId).then(function(book){
            if(!book)
                alert('sorry, this book has been removed off the shell');
            else{
                //$rootScope.book = book;
                $cookies.putObject('book', bookId);
                $location.path("/product");
            }
        });
    }

    function GoCheck(){

        if(user == undefined){
            alert('please login first');
            return;
        }

        var records = $scope.records;
        var date = new Date();

        if(records != undefined) {
            for (var i = 0; i < records.length; i++) {
                delete records[i]._id;
                records[i].date = date;
            }

            HistoryService.goCheck(user._id, records).then(function (user) {
                $rootScope.user = user;
                $location.path("/shoppingrecord");
            });
        }


    }
}
	
 
(function(){
    angular
        .module("EstoreApp")
        .controller("SellerDialogController", SellerDialogController);
})();

function SellerDialogController($scope, ngDialog, BookService) {

    $scope.sellerId = $scope.ngDialogData.sellerId;
    $scope.sellerName = $scope.ngDialogData.sellerName;
    $scope.book = $scope.ngDialogData.book;
    if($scope.book != undefined){
        var price = $scope.book.price;
        price = price.substring(1, price.length);
        $scope.price = Number(price);
    }

    $scope.submit = Submit;
    $scope.getRating = GetRating;
    $scope.getAsin = GetAsin;
    $scope.imageChanged = ImageChanged
    var image;

    function Submit(book, price){

        if(book.title == undefined)
            alert("The title is invalid");
        else if(price == undefined ||price <= 0)
            alert("The price is invalid");
        else {
            if(Number.isInteger(price))
                book.price = '$' + price + ".00";
            else
                book.price = '$' + price;

            if(image != undefined)
                book.image = image;
            else if(book.image == undefined)
                book.image = "img/default/book1.png";

            if($scope.sellerId != undefined) {
                book.sellerId = $scope.sellerId;
                book.sellerName = $scope.sellerName;
                BookService.createBook(book).then(function (book) {
                    BookService.findBooksBySellerId($scope.sellerId).then(function (books) {
                        $scope.closeThisDialog(books);
                    });
                });
            }
            else{
                BookService.updateBook(book._id, book).then(function (books) {
                        $scope.closeThisDialog(books);
                });
            }
        }
    }

    function GetRating(){

        return $scope.book.rating == undefined? 2 + Math.random() * 3: $scope.book.rating;
    }

    function GetAsin(){
        return $scope.book.asin == undefined? guid().substring(0, 10): $scope.book.asin;
    }

    function ImageChanged(element){
        var fileDisplayArea = document.getElementById('display');
        image = undefined;
        fileDisplayArea.innerHTML = "";

        if(element.files[0] == undefined || element.files[0] == null)
            return;
        var name = element.files[0].name;

        if(name.length <= 4)
            alert("The input is invalid");
        else{
            var extension = name.substring(name.length -3, name.length).toLowerCase()
            if(extension != "jpg" && extension != 'png')
                alert("System could only approve '.jpg' or '.png' files");
            else {
                var file = element.files[0];
                var reader = new FileReader();

                reader.onload = function(e) {
                    var img = new Image();
                    image = reader.result;
                    img.src = image;
                    img.className = "big-icon";
                    fileDisplayArea.appendChild(img);
                }
                reader.readAsDataURL(file);
            }
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
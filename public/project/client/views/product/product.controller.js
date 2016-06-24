angular
    .module("EstoreApp")
    .controller("ProductController", ProductController);

function ProductController ($scope,$location, $rootScope, $cookies, UserService, BookService, CommentService, ngDialog) {
    GetBook($cookies.getObject('book'));

    $scope.removeComment = RemoveComment;
    $scope.editComment = EditComment;
    $scope.addComment = AddComment;
    $scope.enterSeller = EnterSeller;

    function GetBook(bookId){
        BookService.findBookById(bookId).then(function(book){
            $scope.book = book;
            console.log(book);
            RenderComments();
        });
    }

    function EnterSeller(sellerId){
        $cookies.put('seller', sellerId);
        $location.path('/visit');
    }

    function RenderComments(){
        CommentService.findCommentsByBookId($scope.book._id).then(function(res){
            $scope.comments = res;
        })
    }

    function AddComment(content){
        var comment = {
            bookId: $scope.book._id,
            title: $scope.book.title,
            bookImage: $scope.book.image,
            comment: content
        }
        console.log(comment);
        UserService.loggedin().then(function(user) {
            $rootScope.user = user;
            var date = Date();
            var s = date.split(" ")
            comment.date = ""
            for (var i = 0; i < s.length - 1; i++)
                comment.date += s[i] + ' ';

            comment.userId = user._id;
            comment.userImage = user.image;
            comment.username = user.username;

            CommentService.createComment(comment).then(function (res) {
                console.log(res)
                $scope.comments = res;
            })
        }, function(err){
            alert('Please login first');
        });
    }

    function RemoveComment(bookId, id){
        CommentService.removeComment(bookId, id).then(function(res){
            $scope.comments = res;
        })
    }

    function EditComment(comment){
        
        ngDialog.openConfirm({
            template: 'views/product/dialog/dialog.view.html',
            controller: 'CommentDialogController',
            className: 'ngdialog-theme-default ngdialog-theme-custom',
            scope : $scope,
            data: {
                comment: JSON.parse(JSON.stringify(comment))
            }
        }).then(null, function(comments){
            if(comments != undefined)
                $scope.comments = comments;
        })
    }
}

angular
    .module("EstoreApp")
    .controller("ProfileController", ProfileController);

function ProfileController ($scope, $rootScope, $cookies, $location, UserService, CommentService, FollowService, BookService) {

    $scope.user = $rootScope.user;
    RenderComments();
    RenderFollowed();

    $scope.flag = true;
    $scope.removeUser = RemoveUser;
    $scope.editUser = EditUser;
    $scope.deleteFollow = DeleteFollow;
    $scope.enterBook = EnterBook;
    $scope.enterSeller = EnterSeller;
    $scope.active = Active;

    function Active(bool){
        if($scope.flag == bool)
            return "active";
        else
            return "";
    }
    function RenderComments(){
        CommentService.findCommentsByUserId($scope.user._id).then(function(comments){
            $scope.comments = comments;
        })
    }

    function RenderFollowed(){
        FollowService.findFollowedByUserId($scope.user._id).then(function(followed){
            $scope.followed = followed;
        })
    }

    function EnterBook(bookId){
        BookService.findBookById(bookId).then(function(book){
            if(!book)
                alert('sorry, this book has been removed off the shell');
            else{
                $cookies.putObject('book', book._id);
                $location.path("/product");
            }
        });
    }

    function EnterSeller(sellerId){
        UserService.findVisiterById(sellerId).then(function(seller){
            if(!seller)
                alert('this seller has deleted is account, please try another one')
            else{
                $cookies.put('seller', seller._id);
                $location.path('/visit');
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

    function DeleteFollow(userId, id){
        FollowService.deleteFollow(userId, id).then(function(followed){
            $scope.followed = followed;
        })
    }
}

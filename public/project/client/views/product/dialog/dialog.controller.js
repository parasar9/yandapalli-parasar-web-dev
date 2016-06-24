 
(function(){
    angular
        .module("EstoreApp")
        .controller("CommentDialogController", CommentDialogController);
})();

function CommentDialogController($scope, ngDialog, CommentService) {

    $scope.comment = $scope.ngDialogData.comment;

    $scope.submit = Submit;
    function Submit(comment){
        CommentService.updateComment(comment).then(function(res){
            $scope.closeThisDialog(res);
        });
    }
}

(function(){
    angular
        .module("EstoreApp")
        .factory("CommentService", CommentService)

    function CommentService($http, $q){
        var commentService = {
            findCommentsByBookId : FindCommentsByBookId,
            findCommentsByUserId: FindCommentsByUserId,
            createComment: CreateComment,
            removeComment: RemoveComment,
            updateComment: UpdateComment
        }
        return commentService;

        function FindCommentsByUserId(userId){
            var deferred = $q.defer();
            $http.get("/api/project/user/" + userId + "/comments")
                .success(function(comments){
                    deferred.resolve(comments);
                });
            return deferred.promise;
        }

        function FindCommentsByBookId(bookId){
            var deferred = $q.defer();
            $http.get("/api/project/book/" + bookId + "/comments")
                .success(function(comments){
                    deferred.resolve(comments);
                });
            return deferred.promise;
        }

        function CreateComment(comment){
            var deferred = $q.defer();
            $http.post("/api/project/comment", comment)
                .success(function(comments){
                    deferred.resolve(comments);
                });
            return deferred.promise;
        }

        function RemoveComment(bookId, id){
            var deferred = $q.defer();
            $http.delete("/api/project/comment/" + id + "/book/" + bookId)
                .success(function(comments){
                    deferred.resolve(comments);
                });
            return deferred.promise;
        }

        function UpdateComment(comment){
            var deferred = $q.defer();
            $http.put("/api/project/comment/" + comment._id, comment)
                .success(function(comments){
                    deferred.resolve(comments);
                });
            return deferred.promise;
        }

        return CommentService;
    }
})();
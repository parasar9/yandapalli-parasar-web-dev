(function() {
    angular
        .module("BookShelfApp")
        .factory("MyBookService", MyBookService);

    

    function MyBookService($http) {

        var api = {
            findBooksByUserId : findBooksByUserId,
            removeBookById : removeBookById
        };

        return api;

        // given the user ID, return the user's favorite books through promise
        function findBooksByUserId(userId) {
            var url = "/api/bookshelf_user/"+ userId + "/book";
            return $http.get(url);
        }
        
        // given book ID, remove the book from favorite book list
        function removeBookById(userId, bookId) {
            var url = "/api/bookshelf_user/" + userId + "/book/" + bookId;
            return $http.delete(url);
        }

    }
})();


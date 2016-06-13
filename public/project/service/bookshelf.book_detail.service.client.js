(function() {
    angular
        .module("BookShelfApp")
        .factory("BookDetailService", BookDetailService);



    function BookDetailService($http) {

        var api = {
            findBookDetailByBookId : findBookDetailByBookId
        };
        return api;

        // given the book ID, return the detail information of the book
        function findBookDetailByBookId(bookId) {
            var url = "/api/book_detail/" + bookId;
            return $http.get(url);
        }


    }
})();


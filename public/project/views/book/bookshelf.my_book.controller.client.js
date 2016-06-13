(function() {
    angular
        .module("BookShelfApp")
        .controller("MyBookController", MyBookController);

    function MyBookController ($location, $routeParams, MyBookService, BookDetailService) {
        var vm = this;
        var bookIds= [];
        vm.userId = $routeParams.userId;


        vm.searchBooks = searchBooks;
        vm.getAuthors = getAuthors;
        vm.removeBook = removeBook;

        function init() {
            MyBookService
                .findBooksByUserId(vm.userId)
                .then(
                    //first get the IDs of favorite books
                    function (response) {
                        bookIds = response.data;
                    }
                )
                .then(
                    // then get the details according to IDs
                    function () {
                        vm.books = [];
                        for (var i in bookIds) {
                            BookDetailService
                                .findBookDetailByBookId(bookIds[i])
                                .then(
                                    function (resp) {
                                        vm.books.push(resp.data);
                                    }
                                );
                        }
                    }
                );
        }
        init();

        function removeBook(bookId) {
            MyBookService
                .removeBookById(vm.userId, bookId)
                .then(
                    function () {
                        init();
                        vm.success = "Book removed. ";
                        // $location.url("/user/" + userId + "/book");

                    },
                    function () {
                        vm.error = "Unable to remove the book. ";
                    });
        }

        function searchBooks(searchText) {
            return searchText;
        }
        
        function getAuthors(authors) {
            var authorString = "";
            var len = authors.length;
            var limit = len;
            var maxNumOfAuthors = 2;
            if (len > maxNumOfAuthors) {
                limit = maxNumOfAuthors;
            }
            for (var i = 0; i < limit; i++) {
                authorString = authorString + authors[i] + ", ";
            }
            if (limit < len) {
                authorString += "etc";
            } else {
                authorString = authorString.substring(0, authorString.length-2);
            }
            return authorString;
        }

        
    }

})();
(function() {
    angular
        .module("BookShelfApp")
        .controller("BookDetailController", BookDetailController);

    function BookDetailController ($routeParams, $location, BookDetailService, MyBookService) {
        var vm = this;
        vm.bookId = $routeParams.bookId;
        vm.userId = $routeParams.userId;

        // data template presented for convenience
        vm.book = {
            _id: "",
            title: "",
            subtitle: "",
            publisher: "",
            authors: [],
            pageCount: 0,
            identifier: "",
            identifierType: "",
            previewLink: "",
            smallThumbnail: ""
        };

        vm.getTitle = getTitle;
        vm.getAuthors = getAuthors;
        vm.getIndustrialIdentifier = getIndustrialIdentifier;
        vm.removeBook = removeBook;

        function init() {
            BookDetailService
                .findBookDetailByBookId(vm.bookId)
                .then(
                    function (response) {
                        vm.book = response.data;
                    }
                );
        }
        init();

        function getTitle() {
            var title = vm.book.title;
            var subtitle = vm.book.subtitle;
            if (subtitle) {
                title = title + ": " + subtitle;
            }
            return title;
        }
        
        function getAuthors() {
            var authors = vm.book.authors;
            var authorString = "";
            var len = authors.length;

            for (var i = 0; i < len; i++) {
                authorString += authors[i] + ", ";
            }

            authorString = authorString.substring(0, authorString.length-2);

            return authorString;
        }

        function getIndustrialIdentifier() {
            var type = vm.book.identifierType;
            var identifier = vm.book.identifier;
            var indIdentifier = "";
            if (type && type !== "other" && type !== "OTHER") {
                indIdentifier = type + "-" + identifier;
            } else {
                indIdentifier = identifier;
            }
            return indIdentifier;
        }

        function removeBook(bookId) {
            MyBookService
                .removeBookById(vm.userId, bookId)
                .then(
                    function () {
                        $location.url("/user/" + vm.userId + "/book");

                    },
                    function () {
                        vm.error = "Unable to remove the book. ";
                    });
        }
    }

})();
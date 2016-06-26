(function(){
    angular
        .module("EstoreApp")
        .factory("BookService", BookService)
    function BookService($http, $q){

        var bookService = {
            searchBooks: SearchBooks,
            createBook: CreateBook,
            findBookById: FindBookById,
            removeBook: Removebk,
            updateBook: UpdateBook,
            getSellerBooks: GetSellerBooks,
            findBooksBySellerId: FindBooksBySellerId
        }
        return bookService;

        function GetSellerBooks(){
            var deferred = $q.defer();
            $http.get("/api/project/seller/books/")
                .success(function(books){
                    deferred.resolve(books);
                });
            return deferred.promise;
        }

        function UpdateBook(id, book){
            var deferred = $q.defer();
            $http.put("/api/project/book/" + id, book)
                .success(function(books){
                    deferred.resolve(books);
                });
            return deferred.promise;
        }

        function Removebk(sellerId, id){
            var deferred = $q.defer();
            $http.delete("/api/project/book/" + id + "/seller/" + sellerId)
                .success(function(books){
                    deferred.resolve(books);
                });
            return deferred.promise;
        }

        function FindBooksBySellerId(id){
            var deferred = $q.defer();
            $http.get("/api/project/seller/"+ id + "/books")
                .success(function(books){
                    deferred.resolve(books);
                });
            return deferred.promise;

        }

        function SearchBooks(keyword){
            var deferred = $q.defer();
            $http.get("/api/search/books/" + keyword)
                .success(function(items){
                    deferred.resolve(items);
                });
            return deferred.promise;
        }

        function CreateBook(book){
            var deferred = $q.defer();
            $http.post("/api/project/book/", book)
                .success(function(book){
                    console.log(book);
                    deferred.resolve(book);
                });
            return deferred.promise;
        }

        function FindBookById(id){
            var deferred = $q.defer();
            $http.get("/api/project/book/" + id)
                .success(function(book){
                    deferred.resolve(book);
                });
            return deferred.promise;
        }
    }
})();
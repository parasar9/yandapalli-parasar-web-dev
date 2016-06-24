 
angular
    .module("EstoreApp")
    .controller("HeaderController", HeadController);

function HeadController ($scope, $location, $rootScope, UserService) {
    $scope.logout = Logout;
    function Logout(){
        UserService.logout().then(function(){
            $location.path('/home');
        })
    }
}
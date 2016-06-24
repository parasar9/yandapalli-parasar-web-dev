angular
    .module("EstoreApp")
    .controller("LoginController", LoginController);

function LoginController ($scope, $rootScope, $location, UserService) {

    $scope.login = Login;
    $scope.reg = Reg;

    function Login(){
        var username = $scope.username;
        var password = $scope.password;

        if(username == undefined || username.length == 0 || password == undefined || password.length == 0)
            alert("please input username and password");
        else {
            UserService.login(username, password)
                .then(function(user){
                    if(user == null)
                        alert("Sorry, The usrename or password is invalid")
                    else{
                        $rootScope.user = user;
                        $location.path('/profile');
                    }
                }, function(err){
                    alert(err);
                });
        }
    }

    function Reg(){
        $location.path("/reg");
    }

}
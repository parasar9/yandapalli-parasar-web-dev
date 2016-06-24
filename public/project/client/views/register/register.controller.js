angular
    .module("EstoreApp")
    .controller("RegisterController", RegisterController);

function RegisterController ($scope, $rootScope, $location, UserService) {

    $scope.user = undefined;
    $scope.register = Register
    $scope.location = $location
    $scope.imageChanged = ImageChanged
    var image;

    function Register(user){
            delete user["_id"];
        if(user == undefined || user.username == undefined ||
            user.password == undefined || user.password != user.confirmPassword) {
            alert("your username or password is invalid")
        }
        else {
            delete user["confirmPassword"];
            if(image == undefined)
                user.image = "img/default/person_image.png";
            else
                user.image = image;
                UserService.register(user).then(function (user) {
                    if(!user)
                        alert('This username has been occupied, choose another one');
                    else {
                        $rootScope.user = user;
                        $location.path('/profile');
                    }
                })
        }
    }

    function ImageChanged(element){
        var fileDisplayArea = document.getElementById('display');
        image = undefined;
        fileDisplayArea.innerHTML = "";

        if(element.files[0] == undefined || element.files[0] == null)
            return;
        var name = element.files[0].name;

        if(name.length <= 4)
            alert("The input is invalid");
        else{
            var extension = name.substring(name.length -3, name.length).toLowerCase()
            if(extension != "jpg" && extension != 'png')
                alert("System could only approve '.jpg' or '.png' files");
            else {
                var file = element.files[0];
                var reader = new FileReader();

                reader.onload = function(e) {
                    var img = new Image();
                    image = reader.result;
                    img.src = image;
                    img.className = "big-icon";
                    fileDisplayArea.appendChild(img);
                }
                reader.readAsDataURL(file);
            }
        }
    }
}
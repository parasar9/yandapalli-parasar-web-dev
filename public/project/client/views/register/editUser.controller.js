angular
	.module("EstoreApp")
	.controller("EditUserController", EditUserController);

function EditUserController ($scope, $rootScope, $location, UserService) {

	$scope.user = $rootScope.user;
	$scope.location = $location;
	$scope.imageChanged = ImageChanged
	$scope.submit = Submit;
	var image;

	function Submit(user){
		if(image != undefined)
			user.image = image;
		UserService.updateUser(user._id, user).then(function(user){
			if(user == null)
				alter("edit failed")
			else{
				$rootScope.user = user;
				$location.path('/profile');
			}
		})
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

};

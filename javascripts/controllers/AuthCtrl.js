app.controller("AuthCtrl", function($scope, AuthFactory, UserFactory){
	$scope.auth = {};

	$scope.registerUser = () =>{
		//create new auth
		AuthFactory.registerWithEmail($scope.auth).then((didRegister) =>{
			console.log("didRegister", didRegister);
		//adding username
			$scope.auth.uid = didRegister.uid;
			return UserFactory.addUser($scope.auth);
		}, (error) => { //this is another way of writing a catch when you have multiple thens
			console.log("registerWithEmail error", error);
		}).then((registerComplete) =>{
			console.log("registerComplete", registerComplete);
		}).catch((error) =>{
			console.log("addUser error", error);
		});

		//login	
	};

	$scope.loginUser = () =>{
		
	};

});
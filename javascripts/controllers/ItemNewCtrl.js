app.controller("ItemNewCtrl", function ($http, $q, $scope, FIREBASE_CONFIG) {


		$scope.addNewItem = () => {
			$scope.newTask.isCompleted = false;
			postNewItem($scope.newTask).then((response) =>{
				$scope.newTask = {};
				// getItems(); we don't need this we just need to switch views
			}).catch((error) => {
				console.log("Add error", error);
			});
		};

});
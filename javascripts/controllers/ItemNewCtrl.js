app.controller("ItemNewCtrl", function ($http, $q, $scope, FIREBASE_CONFIG) {
		let postNewItem = (newItem) =>{
			return $q ((resolve, reject) =>{
				$http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`, JSON.stringify(newItem))
				.then((resultz) =>{
					resolve(resultz);
				}).catch((error) => {
					reject(error);
				});
			});
		};

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
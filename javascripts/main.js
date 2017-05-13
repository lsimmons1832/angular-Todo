app.run((FIREBASE_CONFIG) =>{
 firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("NavCtrl", ($scope) =>{
	$scope.cat = "Meow";
	$scope.navItems = [{name: "Logout"},{name: "All Items"},{name: "New Item"}];
});

app.controller("ItemCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
	$scope.dog = "Woof";
	$scope.showListView = true;
  $scope.items = [];

	$scope.newItem = () => {
		$scope.showListView = false;
	};

	$scope.allItems = () => {
			$scope.showListView = true;
	};

	let getItemList = () =>{  //This is the function getting info from Firebase
		let itemz = []; //This itemz array only exist in this function
		return $q((resolve, reject) =>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/items.json`)
			.then((fbItems)=>{
          var itemCollection = fbItems.data;
          Object.keys(itemCollection).forEach((key) => {
            itemCollection[key].id=key;
            itemz.push(itemCollection[key]);
          });
          resolve(itemz);
			}).catch((error) =>{
				reject(error);
			});
		});
	};

		let getItems = () => {
			getItemList().then((itemz) =>{
				$scope.items = itemz;
			}).catch((error) =>{
				console.log("get Error", error);
			});
		};

		getItems();

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
				$scope.showListView = true;
				getItems();
			}).catch((error) => {
				console.log("Add error", error);
			});
		};

});
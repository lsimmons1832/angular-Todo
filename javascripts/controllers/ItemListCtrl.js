app.controller("ItemListCtrl", function ($http, $q, $scope, FIREBASE_CONFIG) {
	$scope.items = [];

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
});
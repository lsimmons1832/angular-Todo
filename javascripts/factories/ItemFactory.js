app.factory("ItemFactory", function ($http, $q, FIREBASE_CONFIG) {
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


	return {getItemList:getItemList, postNewItem:postNewItem};

});
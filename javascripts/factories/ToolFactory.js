app.factory("ToolFactory", function($q, $http, FIREBASE_CONFIG){
    let getToolList = (itemId) => {
        let toolz = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/tools.json?orderBy="itemId"&equalTo="${itemId}"`)
                .then((fbTools) => {
                    let toolCollection = fbTools.data;
          if(toolCollection !== null ){
              Object.keys(toolCollection).forEach((key) => {
                toolCollection[key].id=key;
                toolz.push(toolCollection[key]);
              });              
          }
          resolve(toolz);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return {getToolList:getToolList};
});
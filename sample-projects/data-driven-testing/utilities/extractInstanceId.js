(function(){

	var aFunction = function(response, opts, instanceName){
		var instanceMap = JSON.parse(response).instanceMap;
		for(var key in instanceMap){
		    var instance = instanceMap[key];
		    if(instance.instanceName === instanceName) return key;
		}
		return '';
	};

	return aFunction;
})();

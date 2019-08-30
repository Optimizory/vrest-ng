(function(){

	var aFunction = function(response, options, instanceName){
		var result = JSON.parse(response);
		var instanceMap = result.instanceMap;
		for(var instanceId in instanceMap){
		    var instance = instanceMap[instanceId];
		    if(instance.instanceName === instanceName) return instanceId;
		}
		return null;
	};

	return aFunction;
})();

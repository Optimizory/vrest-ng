(function(){

	var aFunction = function(response){
	  var result = JSON.parse(response);
	  return result.output[0].pricePerCycle + "";
	};

	return aFunction;
})();

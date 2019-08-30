(function(){

	var aFunction = function(){
	    var today = new Date();
        var dd = today.getDate() - 1;
        var mm = today.getMonth()+1; //January is 0!
    
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        }
        
		return yyyy+'-'+mm+'-'+dd+'T18:30:00.000Z';
	};

	return aFunction;
})();
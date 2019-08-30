(function(){

	var aFunction = function(format){
	    var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
    
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        }
        
        var dateStr = format.replace('mm', mm);
        dateStr = dateStr.replace('dd', dd);
        dateStr = dateStr.replace('yyyy', yyyy);
		return dateStr;
	};

	return aFunction;
})();
(function() {

    //supporting functions
    //compares two JSON objects
    var compareObject = function (obj1, obj2, customJSONPropertyChecker){

        var specialKeys = Object.keys(customJSONPropertyChecker);
        if(specialKeys.length){
          // add special keys in obj1 if not found in obj2
          // or in obj2 if not found in obj1
          specialKeys.forEach(function(k){
              if(obj1.hasOwnProperty(k) && !obj2.hasOwnProperty(k)) {
                obj2[k] = undefined;
              } else if(obj2.hasOwnProperty(k) && !obj1.hasOwnProperty(k)) {
                obj1[k] = undefined;
              }
          });
        }

        var aKeys = Object.keys(obj1).sort(),
            bKeys = Object.keys(obj2).sort(),
            i, count;

        if(aKeys.length !== bKeys.length) return false;
        for(i = 0, count = aKeys.length; i < count; i++) {
            if(aKeys[i] !== bKeys[i]){
                return false;
            } else if(customJSONPropertyChecker[aKeys[i]]) {
                if(typeof(customJSONPropertyChecker[aKeys[i]]) === 'function' && !customJSONPropertyChecker[aKeys[i]](obj1[aKeys[i]], obj2[aKeys[i]])) {
                    return false;
                }
            } else if(!compareJSON(obj1[aKeys[i]], obj2[aKeys[i]], customJSONPropertyChecker)){
                if(obj1[aKeys[i]] !== obj2[aKeys[i]]){
                    return false;
                }
            }
        }

        return true;
    };

    //compares two JSON arrays
    var compareArray = function (arr1, arr2, customJSONPropertyChecker){
        if(arr1.length !== arr2.length){
            return false;
        } else {
            var i, count = arr1.length, j, corr = new Array(count);
            if(!count) return true;
            for(i = 0; i < count; i++){
              if(!(corr[i])){
                if(compareJSON(arr1[i], arr2[i], customJSONPropertyChecker)){
                  corr[i] = true;
                } else {
                  for(j = 0; j < count; j++){
                    if(j !== i){
                      if(compareJSON(arr1[i], arr2[j], customJSONPropertyChecker)){
                        corr[i] = corr[j] = true;
                        break;
                      }
                    }
                  }
                }
              }
            }
            for(i = 0; i < count; i++){
              if(!(corr[i])){
                return false;
              }
            }
            return true;
        }
    };

    /**
     * Main Function
     * Compares two JSON objects
     *
     * @param {object} obj1 - first object
     * @param {object} obj2 - second object
     * @param {object} customJSONPropertyChecker - By default this method checks each propery for exact match,
     *                 but by providing this object, special checks can be provided on some properties while matching
     *
     * @returns {Boolean}
     */
    var compareJSON = function (obj1, obj2, customJSONPropertyChecker){

        if(obj1 === null && obj2 === null) return true;
        if(obj1 === undefined && obj2 === undefined) return true;
        if(typeof(obj1) != 'object' || typeof(obj2) != 'object' || !obj1 || !obj2){
          return Boolean(obj1 === obj2);
        }

        customJSONPropertyChecker = customJSONPropertyChecker || {};

        var isArrayA = Array.isArray(obj1);
        var isArrayB = Array.isArray(obj2);
        if(isArrayA && isArrayB) {
            return compareArray(obj1, obj2, customJSONPropertyChecker);
        } else if((!isArrayA && isArrayB) || (isArrayA && !isArrayB)){ // if one object is array and other is not then they are not equal
            return false;
        } else {
            return compareObject(obj1, obj2, customJSONPropertyChecker);
        }
    };

    return compareJSON;
})();

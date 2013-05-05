define(
		
	'models/Employee',
	
	function () {
		
		var _employee = function() {
				    	 var _name = 'nome';
				    	 
				    	 this.getName = function(){
				    		 	return this._name;
				    	 	} 
					   };
		
	    return _employee;
	}
);
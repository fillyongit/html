//Since the order plugin was used, the
//scripts will be fetched in parallel
//and asynchronously, but executed
//in the order specified below.

// Senza usare il plugin order, gli script sono
// caricati in modo sincrono. Se si usasse quel plugin
// sarebbe scaricati simultaneamente e asinocronicamente.

// Nota che il baseUrl degli script corrisponde alla directory di main.js
require([
        "mylib/script1",
        "mylib/script2",
        "mylib/script3"
    ],
    function(script1, script2, script3){
        //This function is called once all the scripts
        //have loaded and executed.

    	alert(script1);
    	alert(script2.test);
    	alert(script3.test);
    }
);

//There is also a simplified syntax if you just want to load 
//some plain JavaScript files that do not define modules:
require(["js/script.js"], function() {
    //This function is called after some/script.js has loaded.
	
	// Culo è una variabile dfinita nello script.js.
	// Quindi qui siamo nello stesso contesto.
	alert(culo);
});

// Come implementare una gerarchia di oggeti con RequireJS.
require(['models/Manager'], function(Manager){
	alert(Manager.getName());
});



/*
Il seguente esempio non funziona con RequireJS perchè questi
a differenza di CommonJS carica i moduli in modo asincrono.
*/
/*var Employee = require('models/employee');
function Manager() {
	this.reports = [];
}
//Error if require call is async
Manager.prototype = new Employee();*/
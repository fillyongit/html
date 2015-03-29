// Esegui con node:
// node test-node.js
console.log(process.argv);

// Per includere moduli (globali e locali)
// require("nome modulo")


var fs = require('fs');
var path = require('path');

// path.resolve: è come se facessi
// cd __dirname
// cd media
// ..
// alla fine resituisce il percorso assoluto a file.txt
var filetxt = path.resolve(__dirname, 'media', 'file.txt');
var mediadir = path.resolve(__dirname, 'media');

//Legge un file in modo sincrono
var buffer = fs.readFileSync(filetxt);
console.log('Sync-> ' + buffer.toString().split('\n').length);

//Legge un file in modo asincrono
fs.readFile(filetxt, function(err,buffer){
	console.log(err);
	if (!err)
		console.log('Async-> ' + buffer.toString().split('\n').length);
});

// Legge una directory in modo asincrono e mostra i file con estensione html
fs.readdir(mediadir, function(err,list){
	var ext = '';
	var filteredList = list.filter(function(filename, i){
		if (path.extname(filename).substr(1) == 'html')//process.argv[2])
			return true;
		else
			return false;
	});
	console.log(filteredList);
});

// Legge una directory in modo asincrono e mostra i file con una certa estensione usando un modulo.
// La lettura della directory viene fatta nel modulo e la stampa a video viene fatta qua nel chiamante.
var myModule = require('./test-module');
myModule(mediadir, 'html', function(err,data){
  if (err)
	    return console.error('There was an error:', err)

  data.forEach(function (file) {
	  console.log(file)
  })
});

// Http client
var http = require('http');
http.get(process.argv[2], function(res) {
  // res è un oggetto Response che è un ReadableStream.
  console.log("Got response: " + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  //res.setEncoding('utf8'); // La codifica a utf8 converte il buffer in stringa automaticamente senza dover fare toString().
  res.on('data', function(chunk){
	  // L'argomento chunk è un chunk di dati. 
	  // E' sempre un Buffer
	  console.log('%s - %d bytes', chunk.toString(), chunk.length);
  })
  res.on('end', function(){
	  console.log('end');
  })
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

console.log('*******************************');
console.log('HTTP COLLECT');
console.log('*******************************');

var bl = require('bl');
// bl is a storage object for collections of Node Buffers
http.get(process.argv[2], function(response) {
	response.pipe(bl(function (err, data) {
		// Note that when you use the callback method like this, 
		// the resulting data parameter is a concatenation of all Buffer objects in the list
	    if (err)
	      return console.error(err)
	    data = data.toString()
	    console.log(data.length)
	    console.log(data)
	  }));
});

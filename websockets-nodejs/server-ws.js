/**
 * Eseguire come utente apache se si vuoe poi che uno script php possa scrivere sullo stesso local socket del server.
 * sudo -u www-data /path/to/node server-ws.js
 */
var net = require('net');
    WebSocketServer = require('ws').Server
// https://github.com/websockets/ws
 
var adminWS = [];
 
var notify = function(event) {
  for(c in adminWS)
    c.send(JSON.stringify({
      time: (new Date()).getTime()
    }));
};
 
var server = net.createServer(function(socket){
	// Connection callback. E' come server.on('connection', function(socket){ ... });
	// Socket è un ReadableStream.
	socket.on('data', function(buffer){
		console.log('data received...' + buffer.toString() + ' ' + buffer.length);
		//notify(buffer);
		wss.broadcast(buffer.toString());
	});
	socket.on('end', function(){
		console.log('client disconnected');
	});
});
server.listen('/tmp/bac.sock', function(){
	console.log('Server bound on %j', server.address());
});
server.on('error', function (e) {
	  if (e.code == 'EADDRINUSE') {
	    console.log('Server socket in use!');
	  }
});

var wss = new WebSocketServer({port: 8080}, function(err, data) {
	// Listening callback.
	console.log('WebSocketServer listening...');
});
wss.broadcast = function broadcast(data) {
	  wss.clients.forEach(function each(client) {
	    client.send(data);
	  });
};
wss.on('connection', function(ws) {
	console.log('Nuova connessione');
//	setInterval(function() {
//		ws.send(JSON.stringify({msg: 'connessione avvenuta'})); 
//	}, 2000);
    adminWS.push(ws);
});
wss.on('error', function (e) {
	  if (e.code == 'EADDRINUSE') {
	    console.log('Address in use!');
	  }
});
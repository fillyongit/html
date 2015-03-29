var net = require('net');
var server = net.createServer(function(socket){
	var date = new Date();
	socket.write(date.getFullYear() + '-' + 
			date.getMonth() + '-' + 
			date.getDay() + ' ' + 
			date.getHours() + ':' + 
			date.getMinutes()
	);
	
	socket.on('end', function(){
		console.log('client disconnected');
	})
});
server.listen(process.argv[2], function(){
	console.log('Server bound on %j', server.address());
});
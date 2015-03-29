var http = require('http'),
    dispatcher = require('httpdispatcher'),
    WebSocketServer = require('ws').Server;

// https://github.com/websockets/ws
 
dispatcher.setStatic('static');
 
var adminWS = [];
 
var notify = function(req, res) {
  for(c in adminWS)
    c.send(JSON.stringify({
      ip: req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      time: (new Date()).getTime()
    }));
}
 
dispatcher.onGet("/homepage", function(req, res) {
    res.end("<h1>Homepage</h1");
    notify(req, res);
});
 
var server = http.createServer(function (req, res) {
    dispatcher.dispatch(req, res);
});
 
server.listen(1337, '127.0.0.1');
var wss = new WebSocketServer({server:server});
wss.on('connection', function(ws) {
	console.log('nuova connessione')
	ws.send(JSON.stringify({msg: 'connessione avvenuta'}));
    adminWS.push(ws);
});
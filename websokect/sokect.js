var sokect = require('socket.io');
var http = require('http');

var server = http.createServer(function(req,res){
	res.end("start socket.io server")
});

var io = sokect(server);

io.on('connection',function(socket){
	socket.on("msg",function(data){
		console.log(data);
		io.sockets.emit("say",data);
	})
});

server.listen(8888);
console.log("websokect服务器已开启")

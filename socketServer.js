var User = require('./models/user.js');
function Socket(server) { //создать функцию которая создаст сокет  сервер в которую передаются сервер экспресс
	var users = {};
	var io = require('socket.io').listen(server);		
	io.on('connection', function(socket) {	

		console.log('websocket connection start');

		socket.on('SharingUserEmail', function(data) {
			users[data.UserEmail] = {
				'socket' : 	socket.id
			}
			console.log('socket.id')
			console.log(socket.id);
			console.log(data.UserEmail);
			console.log(data);
		});
		socket.on('SharingList', function(data) {
			io.sockets.connected[users[data.email].socket].emit('SharedListItemToUser', data.id);
		})
	   
	});    

}
module.exports = Socket; 	

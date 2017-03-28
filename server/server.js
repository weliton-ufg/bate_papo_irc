// Buscando biblioteca TCP
var net = require('net');
var comandos = require('../comandos/comandos.js');
var clients = [];
var nicks = {};
var server = net.createServer(function (socket) {

	socket.name = socket.remoteAddress + ":" + socket.remotePort
	clients.push(socket);
	socket.write("Bem vindo " + socket.name + "\n");
	console.log('cliente conectado');

	broadcast(socket.name + " Entrou no chat\n", socket);
	console.log(socket.name);

	//EVENTO ONDE O A CONEXÃO E PERDIDA
	socket.on('end', function () {
		console.log('cliente desconectado');

	});
	socket.on('data', function (data) {
		// analisar a mensagem
		analisarComando(data);

	});

	function analisarComando(data) {
		var mensagem = String(data).trim();
		// o método split quebra a mensagem em partes separadas p/ espaço em branco 
		//dessa forma arg recebe apenas o camando
		var args = mensagem.split(" ");
		if (args[0] == "NICK") nick(args); // se o primeiro argumento for NICK
		else if (args[0] == "USER") user(args);
		else if (args[0] == "JOIN") join(args);
		else socket.write("ERRO: comando inexistente\n");
	}

	// Envia mensagem a todos os clients
	function broadcast(message, sender) {
		clients.forEach(function (client) {
			// Don't want to send it to sender
			if (client === sender) return;
			client.write(message);
		});
		// Log it to the server output too
		process.stdout.write(message)
	}

	function nick(args) {
		var retorno = [];
		comandos.NICK(args, socket, nicks, retorno);
		if (retorno[0]) {
			broadcast(retorno[1] + " Alterou seu Nick para " + socket.nick + "\n", socket);
			socket.write("Nick alterado com sussesso\n");
			return;
		} if (retorno[0]) {
			socket.write("Nick atribuido com sussesso\n");
		}

	}
	function join(args) {

	}

	function user(args) {

	}

}).listen(6667);
// Put a friendly message on the terminal of the server.
console.log("servidor rodando na porta 6667\n");

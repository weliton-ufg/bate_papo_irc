// Buscando biblioteca TCP
var net = require('net');
var clients = [];
var nicks={};
var server = net.createServer(function (socket) {

	socket.name = socket.remoteAddress + ":" + socket.remotePort
	clients.push(socket);
	socket.write("Bem vindo " + socket.name + "\n");
	console.log('cliente conectado');

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
	if ( args[0] == "NICK" )nick(args);  // se o primeiro argumento for NICK
	else if ( args[0] == "USER")user(args);
	else if ( args[0] == "JOIN")join(args);
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

	function join(args){

	}
	function nick(args){
		if(!args[1]){
			socket.write("ERRO:comando NINCK incompleto\n");
			return;
		}else if(nicks[args[1]]){//VERIFICAR SE O NICK JA EXISTE
			socket.write("ERRO: Nickname Já existe\n");
			return;
		}
		else{
			if(socket.nick){
				delete nicks[socket.nick];
			}
			nicks[args[1]]=socket.name;
			socket.nick=args[1];
			console.log(nicks);
			
		}
		broadcast(socket.nick + " Entrou no chat\n", socket);
		socket.write("Comando " + args + " executado com sussesso\n");
	}
	function user(args){

	}

}).listen(6667);
	// Put a friendly message on the terminal of the server.
console.log("servidor rodando na porta 6667\n");

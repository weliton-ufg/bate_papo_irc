// Importar o módulo NET (Conexão TCP ou servidores locais) 
var net = require('net');
// Importa arquivo de comandos
var comandos = require('../comandos/comandos.js');
var clients = [];
var nicks = {};
// Cria um novo servidor que fica disponível para escutar eventos do tipo 'connection'
var server = net.createServer(function (socket) {
	// É atribuído ao atributo 'name' o endereço do cliente requisitante e a porta solicitada
	socket.name = socket.remoteAddress + ":" + socket.remotePort
	// Adiciona o socket na lista de cliente do servidor
	clients.push(socket);
	// Escreve um saldação e os dados de conexão do cliente
	socket.write("Bem vindo " + socket.name + "\n");
	// Mostra mensagem no chat
	console.log('cliente conectado');

	// Mensagem para todos os usuários do chat
	broadcast(socket.name + " Entrou no chat\n", socket);
	console.log(socket.name);

	// Desconexão do cliente
	socket.on('end', function () {
		console.log('cliente desconectado');

	});
	socket.on('data', function (data) {
		// Função para analisar comando enviado pelo cliente
		analisarComando(data);

	});

	function analisarComando(data) {
	    // método trim() retira os espaços do lado esquero e direito da String
		var mensagem = String(data).trim();
		// O método split organiza em Array todas as palavras da string
		// Utiliza como parâmetro o separador passado, no caso " ".
		// Poderia ser "," ";" ou qualquer outro.
		var args = mensagem.split(" ");
		// Verifica qual comando foi digitado pelo usuário
		if (args[0] == "NICK") nick(args);
		else if (args[0] == "USER") user(args);
		else if (args[0] == "JOIN") join(args);
		// Caso seja inexistente escreve na tela
		else socket.write("ERRO: comando inexistente\n");
	}

	// Envia mensagem a todos os clientes conectados
	function broadcast(message, sender) {
		clients.forEach(function (client) {
			// Não envia para o remetente
			if (client === sender) return;
			client.write(message);
		});
		// Escreve mensagem no log do servidor
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
		comandos.JOIN();
	}

	function user(args) {
		comandos.USER();
	}

}).listen(6667);
// Put a friendly message on the terminal of the server.
console.log("servidor rodando na porta 6667\n");
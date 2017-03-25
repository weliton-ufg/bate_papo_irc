
// Buscando biblioteca TCP
var net = require('net');
    irc=require('irc');
var clients = [];
var server = net.createServer(function (connection) {
 console.log('teste');

  connection.name = connection.remoteAddress + ":" + connection.remotePort
  clients.push(connection);
  connection.write("Bem vindo " + connection.name + "\n");
  broadcast(connection.name + " Entrou no chat\n", connection);
	

  console.log('cliente conectado');

  connection.on('end', function () {
    console.log('cliente desconectado');

  });
  //  console.log(conection);


  server.on('data', (data) => {
    analisar(data);
  });

  function analisar(data) {
    var mensagem = String(data).trim();
    // o método split quebra a mensagem em partes separadas p/ espaço em branco
    var args = mensagem.split(" "); 
    if ( args[0] == "NICK" ) nick(args); // se o primeiro argumento for NICK
    else if ( args[0] == "USER") user(args);
    else if ( args[0] == "JOIN") join(args);
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

}).listen(6667);
// Put a friendly message on the terminal of the server.
console.log("servidor rodando na porta 6667\n");

// Buscando biblioteca TCP
var net = require('net');
var server = net.createServer(function(connection) { 
   console.log('cliente conectado');
   
   connection.on('end', function() {
      console.log('cliente desconectado');
   });
   connection.write('Hello World!\r\n');
   connection.pipe(connection);
});
server.listen(8080, function() { 
   console.log('Servidor está ouvindo');
});

// Put a friendly message on the terminal of the server.
console.log("servidor rodando na porta 8080\n");
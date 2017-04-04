// Importa o módulo NET (Conexão TCP e servidor local)
const net = require('net');
// Atribui a porta de conexão com o servidor
const client = net.connect({port: 6667}, () => {
  console.log('conectado ao servidor!');
  //testando envio de comando ao sevidor
  //client.write('NICK grupo-4!\r\n');
});
// Recebe o digitado no chat e trata com a função data.  
client.on('data', function(data){
  console.log(data.toString());
  //client.end();
});
// Encerra a conexão com o servidor.
client.on('end',function() {
  console.log('Cliente desconectado');
});
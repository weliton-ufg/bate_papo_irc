const net = require('net');
const client = net.connect({port: 6667}, () => {
  console.log('conectado ao servidor!');
  //testando envio de comando ao sevidor
  //client.write('NICK grupo-4!\r\n');
});
client.on('data', function(data){
  console.log(data.toString());
  //client.end();
});
client.on('end',function() {
  console.log('disconectado do servidor');
});
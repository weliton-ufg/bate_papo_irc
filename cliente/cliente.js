//var net = require('net');
//var irc = require('irc');
//var Client = net.createConnection;
//var client = Client();


//var net = require('net');
//var Client = net.createConnection;
//var client = Client({port: 6667, localAddress: '', localPort: 51000});

//client.on('connect', function() {
//  var id = this.localAddress + ': ' + this.localPort;
//  console.log('Client connected', id);
//});


//socket.connect(options[, connectListener])
//var socket=net.socket();
//socket.connect()


const net = require('net');
const client = net.connect({port: 6667}, () => {
  // 'connect' listener
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  //client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
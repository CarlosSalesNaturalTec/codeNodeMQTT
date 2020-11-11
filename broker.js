var aedes = require('aedes')()
var server = require('net').createServer(aedes.handle)
var port = 1883

// Listening
server.listen(port, function() {
  console.log('Servidor escutando na porta: ', port);
  console.log('ID Broker: ' + aedes.id);
  console.log('Hora: ' + new Date().toISOString());
});

// Identifica conexões estabelecidas
aedes.on('client', function (client) {
    console.log('\n');
    console.log('START. Modulo Iniciado. ID: ' + client.id + ' Hora: ' + new Date().toISOString() );
})

// Identifica desconexões
aedes.on('clientDisconnect', function (client) {
    console.log('STOP. Modulo Desconectado. ID: ' + client.id);
})

// ================================================================================
// assinatura de topicos
// ================================================================================

// Assina tópico fromClient. Aguarda recebimento de mensagens
aedes.subscribe('fromClient', function(packet, cb) {
    console.log('Mensagem Recebida. Tópico (fromClient). Mensagem: ', packet.payload.toString());
});

// Assina tópico VaiVolta. Responde as mensagens recebidas
aedes.subscribe('VaiVolta', function(packet, cb) {
    console.log('Mensagem Recebida. Tópico (VaiVolta). Mensagem: ', packet.payload.toString());
    
    // envia mensagem para cliente
    aedes.publish({ topic: 'fromServer', payload: "Aqui quem fala eh o Servidor."})
});

// Identifica assinatura de tópicos.
aedes.on('subscribe', function (subscriptions, client) {
    console.log ('Cliente Assinou Tópico. ID: ' + client.id +  ' Tópico: ' + subscriptions.map(s => s.topic).join('\n'))
})

// Identifica cancelamento de assinaturas de tópicos.
aedes.on('unsubscribe', function (subscriptions, client) {
    console.log ('Cliente cancelou Assinatura de Tópico. ID: ' + client.id +  ' Tópico: ' + subscriptions.map(s => s.topic).join('\n'))
})
let mqtt = require('mqtt');
let client = mqtt.connect('mqtt://10.0.0.118:1883');

client.on('connect', function () {
    console.log('Conectado ao Broker')
    
    //assina um tópico
    client.subscribe('fromServer'); 
    
    //Envia mensagem 
    client.publish('fromClient', 'Mensagem enviada pelo cliente em: ' + new Date().toISOString());

    //Envia mensagem 
    client.publish('VaiVolta', 'Mensagem enviada pelo cliente em: ' + new Date().toISOString());
})

// Aguarda mensagens recebidas
client.on('message', function (topic, message) {
  console.log('Mensagem recebida: ' + message.toString() + ' Tópico:' + topic);
});
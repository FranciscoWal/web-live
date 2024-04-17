// Se requiere el módulo mqtt para conectar y comunicarse con un broker MQTT.
var mqtt = require('mqtt');
// Se requiere una función del módulo 'usuarioBD' para buscar un ID de usuario en la base de datos.
var { buscarIdporUser } = require('../bd/usuarioBD');
// Se crea un cliente MQTT y se conecta al broker público de Mosquitto.
var client = mqtt.connect('mqtt://test.mosquitto.org')

// Esta función se llama cuando el cliente se conecta al broker MQTT.
function EventoConectar(){
    // El cliente se suscribe al tópico 'user' para escuchar mensajes.
    client.subscribe('user',function(err){
        // Aquí se manejaría un error en caso de que la suscripción falle, si es necesario.
    })
    
}

// Esta función asíncrona se llama cuando se recibe un mensaje en el tópico suscrito.
async function EventoMensaje(topic, message) {
    // Se intenta buscar el ID del usuario utilizando el mensaje recibido como parámetro.
    // El mensaje se convierte a string antes de pasarlo a la función.
    var err = await buscarIdporUser(message.toString());
    // Aquí se manejaría el error o el resultado de la búsqueda, si es necesario.
}

// Esta función inicializa los eventos del cliente MQTT.
function mqttIndex(){
    // Se configura el evento 'connect' para llamar a la función EventoConectar cuando el cliente se conecte.
    client.on('connect', EventoConectar)
    // Se configura el evento 'message' para llamar a la función EventoMensaje cuando el cliente reciba un mensaje.
    client.on('message',EventoMensaje)
}

// Se exporta la función mqttIndex para que pueda ser utilizada en otras partes del código.
module.exports={
    mqttIndex
}
    
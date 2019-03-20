const io = require ( 'socket.io' ) ( );

// array to store all of the messages
var chatMessages = [];

// when a client connects listen for messages and relay them to all the conected clients
io.on( 'connection', ( client ) => {
  //listen for newMessage
  client.on( 'newMessage', (message) => {
    console.log( 'client is sending a new message: ', message);
    // push the message onto the chatMessages array so we can store a history of the chat on our server
    chatMessages.push(message);
    // broadcast the message to all connected clients
    io.emit( 'postMessage', message );
  });
});


const port = 8000;

io.listen( port );

console.log( 'listening on port', port );

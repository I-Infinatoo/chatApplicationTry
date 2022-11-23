/*
let socket = io();

// `on` when listning for the events 
// `emmit` when want to create an event
socket.on('connect', function() {
    console.log("Connected to server.");

    // // createMessage === createMessageUser 
    // socket.emit('createMessageUser', {
    //     from: 'User Alice',
    //     text: 'Hello! from Alice'
    // })
});

socket.on('disconnect', function() {
    console.log("disconnected from server.");
});


// newMessage === newMessageServer
socket.on('newMessageServer', function(message) {
    console.log('newMessageServer', message);
});

*/

let socket = io();

socket.on('connect', function() {
    console.log('Welcome to the chat.');
})

socket.on('adminMessage', function (message) {
    console.log('message from admin', message);
})

socket.on('newUserMessage', function (message){

    console.log('message from server --existing user log\nmessage', message);
})

socket.on('newUserConnecct', function (message){ 
    console.log('message from server --existing user log\nmessage', message);
})

socket.on('disconnect', function() {
    console.log('disconnected from the server');
})
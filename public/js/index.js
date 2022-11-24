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

// const e = require("express");

let socket = io();

socket.on('connect', function() {
    console.log('Welcome to the chat.');
})

socket.on('Message', function (message) {
    console.log('message from admin', message);

    // print the message on the body as well
    let ele = document.createElement('ele');
    ele.innerText=`${message.from} : ${message.text} \n`;

    document.querySelector('body').appendChild(ele);
})


socket.on('disconnect', function() {
    console.log('disconnected from the server');
})


// script to reload the page again and again when there is a hit on submit button in the form
document.querySelector('#submit-btn').addEventListener('click', function(e){
    // `e` -> for `event`
    // this will stop the default behaviour of reloading the page when button is clicked
    e.preventDefault();

    // now emit the message
    socket.emit('messageFromUserConnect', {
        from:'user',
        text: document.querySelector('input[name="message"]').value
    }, 
    function() {

    }
    )
})
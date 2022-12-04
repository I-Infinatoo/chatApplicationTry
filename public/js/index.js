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
    let li = document.createElement('li');
    li.innerText=`${message.from} : ${message.text}`;

    document.querySelector('body').appendChild(li);    
})

socket.on('locationMessage', function (message) {
    console.log('message from admin', message);

    // print the message on the body as well
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('target', '_blank');

    a.setAttribute('href', message.url)

    a.innerText = 'My current location';

    li.appendChild(a);

    // here link is printed on the console successfully, but not on the page

    document.querySelector('body').appendChild(li);
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

document.querySelector('#send-location').addEventListener('click', function(c){

    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by the browser.');
    }

    // `getCurrentposition` will have two functions.
    // 1. function will get the `current position` if all goes right
    // 2. function will get error
    navigator.geolocation.getCurrentPosition(function(position){
        
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude, 
            lng: position.coords.longitude
        });
        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude);

    }, function(){
        alert('Unable to fetch location.');
    }
    )
})
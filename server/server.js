const express = require('express');

//for `socket.io` we have to make our own server instance 
const socketIo = require('socket.io');
const http = require('http');

// 'path' is a predefined package in node to handle path
const path = require('path');
const publicPath = path.join(__dirname, '/../public');


const {generateMessage} = require('./utils/message');
const { callbackify } = require('util');


const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIo(server);  //passing own server in socket

app.use(express.static(publicPath));    // defining the publicPath as static for the express

// we are listning for a connection event as soon as `socket` from 
// html is initiated call back will be called

/*
io.on('connection', (socket)=>{
    console.log("A new connection has arrived.");


    // creating a custom event and will send it to user

    // newMessage === newMessageServer
    // socket.emit('newMessageServer', {
    //     from: 'Server',
    //     text: 'Hello! from server.'
    // })


    // listning for the custom event sent by user
    
    // createMessage === createMessageUser 
    socket.on('createMessageUser', (message) => {
        console.log('createMessageUser', message);


        // now if wnat to broadcast the incomming message from a user to all other onnected users, then we will use `io`

        // `io` is used to communicate with all the availabe connections whereas `socket` will communicate with only the current connection

        // io.emit will broadcast custom events to all the users

        // newMessage === broadCastMessage
        // io.emit('newMessageServer', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })


        // `socket.broadcast.emit` will broadcast the message to all the connections except the client who sent it
        socket.broadcast.emit('newMessageServer', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime() 
        })
    })


    socket.on('disconnect', ()=>{
        console.log('User is disconnected.');
    });
});


*/

io.on('connection', (socket)=>{

    console.log('A new connection has arrived --server log');

    // when user join 
    socket.emit('Message', generateMessage('Admin', 'Welcome to the chat!'));

    // when a new user join in middle
    // socket.broadcast.emit('newUserConnect', {
    socket.broadcast.emit('Message', generateMessage('Admin', 'A new user has joined the chat!'));

    socket.on('messageFromUserConnect', (message, callback)=>{
        console.log('message from user connect --server log', message);

        io.emit('Message', generateMessage(message.from, message.text));

        // acknowledgement to be sent 
        callback('This is the server');
    })


    socket.on('disconnect', ()=> {
        console.log('User has disconnected --server log');
    })
})

server.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`);
});
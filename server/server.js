const express = require('express');

//for `socket.io` we have to make our own server instance 
const socketIo = require('socket.io');
const http = require('http');

// 'path' is a predefined package in node to handle path
const path = require('path');
const publicPath = path.join(__dirname, '/../public');

const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIo(server);  //passing own server in socket

app.use(express.static(publicPath));    // defining the publicPath as static for the express

// we are listning for a connection event as soon as `socket` from 
// html is initiated call back will be called
io.on('connection', (socket)=>{
    console.log("A new connection has arrived.");


    socket.on('disconnect', ()=>{
        console.log('User is disconnected.');
    });
});

server.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`);
});
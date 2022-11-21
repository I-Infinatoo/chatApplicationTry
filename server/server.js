const express = require('express');

// 'path' is a predefined package in node to handle path
const path = require('path');
const publicPath = path.join(__dirname, '/../public');

const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));    // defining the publicPath as static for the express

app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`);
});
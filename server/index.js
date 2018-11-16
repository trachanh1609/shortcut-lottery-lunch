const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// App setup

// Morgan is a middleware that logs all requests and response
// This is for debugging
app.use(morgan('combined'));

// Bodyparser will parse all request as json
app.use(bodyParser.json({ type: '*/*'}));

app.use('/api', router) ;

app.get('/', function(req, res, next){
    res.send(['hello', 'world']);
});

const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.on('error', function(err){
    if(err.code === "EADDRINUSE") {
        console.log("Server error");
        console.log(`Port ${port} is being used by other process. Please use another port!`)
    } else {
        console.log("Server error");
        console.log(err);
    }
})

server.listen(port, ()=>{
    console.log('Server listening on port ', port);
});

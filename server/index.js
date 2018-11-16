const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to DB

const DB_USERNAME = process.env.DB_USERNAME || 'invalid_username' ;
const DB_PASSWORD = process.env.DB_PASSWORD || 'invalid_password';
const DB_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@ds061839.mlab.com:61839/shortcut-lottery-lunch`;

mongoose.connect(DB_URI, { useNewUrlParser: true }, function(err) {
    if(err) {
        console.log("Connect to DB failed", err.stack);
    } else {
        console.log("Connect to DB successfully");
    }
})

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

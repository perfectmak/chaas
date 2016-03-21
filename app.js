var server = require('http').createServer();
const express = require('express');
const rx = require('rx');

const chatsRoute = require('./services/chats/route');
const presenceRoute = require('./services/presence/route');
const usersRoute = require('./services/users/route');

const app = express();

//routes
app.use('/users', usersRoute);
app.use('/chats', chatsRoute);
app.use('/presence', presenceRoute);

server.on('request', app);
server.listen(3000, function(){
    console.log('Listening on port '+server.address().port);
});
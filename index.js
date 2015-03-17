var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

var ax = 0;
var ay = 0;

var hash = {};

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(sendername, msg){
    io.emit('chat message', sendername, msg);
  });
  socket.on('payload', function(msg){
    io.emit('payload', msg);
  });
  socket.on('update', function(id,mx,my,ox,oy){
    var pair = [mx,my,ox,oy];
    hash[id] = pair;
    //io.emit('update', hash[id],mx,my);
    io.emit('update', hash, mx, my);
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});




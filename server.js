var express = require('express');
var app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
var {v4: uuidV4} = require('uuid');
var path = require('path');
var cors = require('cors');

app.set('view engine', 'ejs');
// app.use('/public', express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname+'/public'));
app.use(express.static('public'));
app.use(cors());

app.get('/', (req,res)=>{
    res.redirect(`/${uuidV4()}`)
})
app.get('/:room', (req, res)=>{
    res.render('room', {roomId: req.params.room})
})

io.on('connection', (socket)=>{
    socket.on('join-room', (roomId, userId));
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);
})

httpServer.listen(3000);
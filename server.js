const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 2424;
const server = http.createServer(app);
const io = require('socket.io')(server);
const {v4:uuidv4} = require('uuid');
const {ExpressPeerServer} = require('peer')
const peer = ExpressPeerServer(server , {
    debug:true
});

app.use(express.static(__dirname + '/public'));

app.use('/peerjs', peer);
app.set('views', __dirname + '/views');
app.set('view engine', "pug");
app.engine('pug', require('pug').__express);

app.get('/', function(req, res){
    res.render("page");
    res.send(uuidv4());
});

// app.get('/video' , (req,res)=>{
//     res.send(uuidv4());
// });

app.get('/:room' , (req,res)=>{
    res.render('video' , {RoomId:req.params.room});
});

server.listen(port, function () {
    console.log('Server chat room dengan port ' + port);
});

io.on('connection', function (socket) {
    socket.emit('message', {message: 'Selamat Datang di Room Chat'});
    socket.on('send', function (data) {
        io.emit('message', data);
    });
    socket.on('newUser' , (id , room)=>{
        socket.join(room);
        socket.to(room).broadcast.emit('userJoined' , id);
        socket.on('disconnect' , ()=>{
        socket.to(room).broadcast.emit('userDisconnect' , id);
            });
        });
});
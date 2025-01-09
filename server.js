const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 2424;
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', "pug");
app.engine('pug', require('pug').__express);
app.get('/', function(req, res){
    res.render("page");
});

server.listen(port, function () {
    console.log('Server chat room dengan port ' + port);
});

io.on('connection', function (socket) {
    socket.emit('message', {message: 'Selamat Datang di Room Chat'});
    socket.on('send', function (data) {
        io.emit('message', data);
    });
});
const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 2424;
const server = http.createServer(app);
const io = require('socket.io')(server);

app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get('/', function(req, res){
    res.render("page");
});

const midport = app.listen(port, function () {
    console.log('Server chat room dengan port ' + port);
});

io.on('connection', function (socket) {
    socket.emit('message', {message: 'Selamat Datang di Room Chat'});
    socket.on('send', function (data) {
        io.socket.emit('message', data);
    });
});
window.onload = function() {

    var message = [];
    var socket = io.connect('http://192.168.5.215:2424');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var color = document.getElementById("favcolor");
    var picture = document.getElementById("file");

    socket.on('message', function (data) {
        if(data.message) {
            message.push(data);
            console.log(message);
            var html = '';
            for(var i=0; i<message.length; i++){
                html += '<b style="color:'+ (message[i].color) +'">' + (message[i].username ? message[i].username : 'Server') + ': </b>';
                if (message[i].message && message[i].picture){
                    html += message[i].message + '<img src="' + message[i].picture + ';" style="width:auto;"> <br />';
                } else if (message[i].message) {
                    html += message[i].message + '<br />';
                } else if (message[i].picture) {
                    html += '<img src="' + message[i].picture + ';" style="width:auto;"> <br />';
                }
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("Terdapat error pada: ", data);
        }
    });

    sendButton.onclick = function() {
        if(name.value == "") {
            alert("Tolong isi nama anda!");
        } else {
            var text = field.value;
            socket.emit('send', {message: text, username: name.value, color: color.value, picture: picture.value});
            field.value = '';
        }
    };

    field.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13){
            sendButton.onclick();
        }
    });
}
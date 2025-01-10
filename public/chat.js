window.onload = function() {

    var message = [];
    var socket = io.connect('http://localhost:2424');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var video = document.getElementById("video");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var color = document.getElementById("favcolor");

    socket.on('message', function (data) {
        if(data.message) {
            message.push(data);
            console.log(message);
            var html = '';
            for(var i=0; i<message.length; i++){
                html += '<b style="color:'+ (message[i].color) +'">' + (message[i].username ? message[i].username : 'Server') + ': </b>';
                html += message[i].message + '<br />';
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
            socket.emit('send', {message: text, username: name.value, color: color.value});
            field.value = '';
        }
    };

    video.onclick = function() {
        if(name.value == "") {
            alert("Tolong isi nama anda!");
        } else {
            window.open('/video');
        }
    };

    field.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13){
            sendButton.onclick();
        }
    });
}
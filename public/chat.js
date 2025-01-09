window.onload = function() {

    var message = [];
    var socket = io.connect('https://localhost:2424');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++){
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
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
            socket.emit('send', {message: text, username: name.value});
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
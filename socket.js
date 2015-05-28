var _socket;

function connectSocket(url) {
    _socket = new WebSocket(url);

    _socket.onmessage = function (event) {
        console.log(event.data);
        var message = JSON.parse(event.data);
        // If this is a message, loop through keywords.
        if (message.type == 'message') {
            for (var s in sound_config) {
                if (message.text.search(sound_config[s].keyword) >= 0) {
                    console.log("Playing sound " + s);
                    playSound(s);
                }
            }
        }
    };

    _socket.onerror = function (event) {
        console.log("Socket error");
        console.log(JSON.stringify(event));
    };

    _socket.onclose = function (event) {
        console.log("Socket closed");
        console.log(JSON.stringify(event));
    };
}

function disconnectSocket() {
    _socket.close();
}

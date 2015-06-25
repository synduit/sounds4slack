var _socket;
var retry_timer;
var heartbeat_timer;
var ping_counter = 1;
var defibrillate_timer;

function connectSocket(url) {
    _socket = new WebSocket(url);

    _socket.onopen = function (event) {
        console.log("Socket open");
        clearTimeout(retry_timer);
        heartbeat_start();
    };

    _socket.onmessage = function (event) {
        console.log(event.data);
        var message = JSON.parse(event.data);
        heartbeat_beat();
        // If this is a message, loop through keywords.
        if (message.type == 'message') {
            for (var s in sound_config) {
                if (message.text.search(sound_config[s].keyword) >= 0) {
                    console.log("Playing sound " + s);
                    playSound(s);
                }
            }
        }
        else if (message.type == 'pong') {
            heartbeat_cancel_defibrillate();
        }
    };

    _socket.onerror = function (event) {
        console.log("Socket error");
        console.log(JSON.stringify(event));
        setTimeout('reconnectSocket()', 1000);
        heartbeat_stop();
    };

    _socket.onclose = function (event) {
        console.log("Socket closed");
        console.log(JSON.stringify(event));
        setTimeout('reconnectSocket()', 1000);
        heartbeat_stop();
    };
}

function disconnectSocket() {
    console.log("Disconnecting...");
    _socket.close();
}

function reconnectSocket() {
    console.log("Retrying...");
    retry_timer = setTimeout('reconnectSocket()', 30000);
    $.ajax({
        url: "https://slack.com/api/rtm.start",
        data: {
            token: auth.token
        },
        success: function(data, status, jqxhr) {
            console.log(JSON.stringify(data));
            connectSocket(data.url);
        }
    });
}

function heartbeat_start() {
    heartbeat_timer = setTimeout('heartbeat_check()', 30000);
}

function heartbeat_beat() {
    clearTimeout(heartbeat_timer);
    heartbeat_timer = setTimeout('heartbeat_check()', 30000);
}

function heartbeat_check() {
    console.log("Heartbeat check");
    defibrillate_timer = setTimeout('heartbeat_defibrillate()', 10000);
    _socket.send(JSON.stringify({id: ping_counter++, type: "ping"}));
}

function heartbeat_defibrillate() {
    console.log('Defibrillate!');
    setTimeout('reconnectSocket()', 1000);
}

function heartbeat_cancel_defibrillate() {
    console.log("Heartbeat check ok");
    clearTimeout(defibrillate_timer);
}

function heartbeat_stop() {
    clearTimeout(heartbeat_timer);
}

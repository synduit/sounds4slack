var auth;

$(document).ready(function() {

    /* Define Connect button click handler. */
    $("#auth-connect").click(function() {
        auth = JSON.parse($("#auth").val());
        localStorage.setItem('auth', JSON.stringify(auth));
        reconnectSocket();
    });

    /* Define Disconnect button click handler. */
    $("#auth-disconnect").click(function() {
        disconnectSocket();
    });

    /* Load token from localStorage. */
    var auth_str = localStorage.getItem('auth');
    if (auth_str != null) {
        auth = JSON.parse(auth_str);
        $("#auth").val(auth_str);
        setTimeout('reconnectSocket()', 1000);
    }
    else {
        // Provide a default example value.
        auth = {};
        auth.token = 'abc123';
        $("#auth").val(JSON.stringify(auth));
    }

});

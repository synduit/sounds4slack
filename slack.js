$(document).ready(function() {

    /* Define Connect button click handler. */
    $("#auth-connect").click(function() {
        var auth = JSON.parse($("#auth").val());
        localStorage.setItem('auth', JSON.stringify(auth));
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
    });

    /* Define Disconnect button click handler. */
    $("#auth-disconnect").click(function() {
        disconnectSocket();
    });

    /* Load token from localStorage. */
    var auth = localStorage.getItem('auth');
    if (auth != null) {
        $("#auth").val(auth);
        $("#auth-connect").trigger('click');
    }
    else {
        // Provide a default example value.
        auth = {};
        auth.token = 'abc123';
        $("#auth").val(JSON.stringify(auth));
    }

});

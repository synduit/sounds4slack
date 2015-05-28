var sound_config = {};

$(document).ready(function() {

    /* Define Apply button click handler. */
    $("#sound-apply").click(function() {
        sound_config = JSON.parse($("#sound-config").val());
        localStorage.setItem('sound', JSON.stringify(sound_config));
        var audio_tags = '';
        for (var s in sound_config) {
            audio_tags += '<audio id="audio' + s + '" src="' + sound_config[s].sound + '" preload="auto"></audio>';
        }
        $("#audio-wrapper").html(audio_tags);
    });

    /* Load sound settings from localStorage. */
    var sound = localStorage.getItem('sound');
    if (sound != null) {
        $("#sound-config").val(sound);
    }
    else {
        sound = [
            {"keyword": "yay", "sound": "http://msound.us/sounds/yay.mp3"},
            {"keyword": "fail", "sound": "http://msound.us/sounds/fail1.mp3"}
        ];
        $("#sound-config").val(JSON.stringify(sound));
    }
    $("#sound-apply").trigger('click');

});

function playSound(id) {
    $("#audio" + id).get(0).play();
}

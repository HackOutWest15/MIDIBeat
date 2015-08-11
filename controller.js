function init() {
    //Create an array with all the key indexes
    var keys = [];
    for (var i = 21; i <= 108; i++) {
        keys.push( i );
    }
    for (var i = 0; i < keys.length; i++) {
        var buttonNumber = keys[i];
        document.getElementById('chooser').innerHTML +=
            "<div class='keyController' id=\"" + buttonNumber + "\">" +
            "<span class='keyController'>" +
            buttonNumber + 
            "<br>" +
            "<input class=\"chooseButton\" type=\"image\" src=\"./resources/dropbox-button.png\" value=\"Dropbox\" onClick=\"chooseDropbox(" + buttonNumber + ")\"></input>" +
            "<br>" +
            "<input class=\"chooseButton\" type=\"button\" value=\"Upload\" onClick=\"chooseLocal(" + buttonNumber + ")\"></input>";
            "</span>" +
            "</div>";
        sampleLibrary.setSample(buttonNumber, null);
    }
}

function chooseDropbox(buttonNumber) {
    var options = {
        success: function(files) {
            sampleLibrary.setSample(buttonNumber, files[0]);
            document.getElementById(buttonNumber).getElementsByTagName("input").value = files[0].name;
        },
        multiselect: false,
        linkType: "direct",
        extenstions: ['audio'],
    }
    Dropbox.choose(options);
}

function playKey(key) {
  console.log("play " + key);
  console.log(sampleLibrary[key]);
  sampleLibrary.play(key);
	//var audio = new Audio('sounds/kick.mp3');
	//audio.play();
}

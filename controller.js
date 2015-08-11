function init() {
    //Create an array with all the key indexes
    var keys = [];
    for (var i = 21; i <= 108; i++) {
        keys.push( i );
    }
    for (var i = 0; i < keys.length; i++) {
        var buttonNumber = keys[i];
        document.getElementById('chooser').innerHTML +=
            "<div id=\"" + buttonNumber + "\">" +
            buttonNumber +
            "<input type=\"image\" src=\"./resources/dropbox-button.png\" value=\"Dropbox\" onClick=\"chooseDropbox(" + buttonNumber + ")\"></input>" +
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
  //console.log("play " + key);s
  sampleLibrary.play(key);
}

// (50, 'https://p.scdn.co/mp3-preview/254eae7ce1d3ee59c411bb97f47b5a8fb9a893b3')
function chooseSpotifyPreviewURL(keyNum, url){
  var preview = new Audio(url);
  sampleLibrary.setSpotifySample(keyNum, preview);
}

function setStartAndStop(key, start, stop){

  if(start>=0 && stop <30){
    sampleLibrary.setStartStop(key, start, stop);
  }
  else {
    console.log("nope");
  }
}

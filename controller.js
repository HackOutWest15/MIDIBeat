function init() {

    var pre = 'resources/samples/';
    var defaultSamples = [
        "BassDrum.wav",
        "ClosedHihat.wav",
        "OpenHiHat.wav",
        "Snare.wav",
        "SnareFX.wav",
        "SnareNoise.wav",
    ];
    for (var i = 0; i < defaultSamples.length; i++) {
        defaultSamples[i] = pre + defaultSamples[i];
    }

    console.log(defaultSamples);

    //Create an array with all the key indexes
    var keys = [];
    for (var i = 21; i <= 108; i++) {
        keys.push( i );
    }
    var buttonNumber = 0;

    var beatpad = document.getElementById("beatpad");
    for ( ; buttonNumber < 16; buttonNumber++) {
        beatpad.innerHTML += "<div id='" + buttonNumber + "' class='drumpad' onMouseDown=\"playKey(" + buttonNumber + ")\" onMouseUp=\"setDrumpadInactive(" + buttonNumber +")\">";
        beatpad.innerHTML += "</div>";
        sampleLibrary.setSample(buttonNumber, defaultSamples[buttonNumber % defaultSamples.length], true);
    }

    var knobs = document.getElementById("knobs");
    for ( ; buttonNumber < 48; buttonNumber++ ) {
        knobs.innerHTML += "<div class='twist' id='" + buttonNumber + "' onMouseDown='playKey(" + buttonNumber + ")' onMouseUp='setDrumpadInactive(" + buttonNumber + ")'>" +
            "<div class='circlebase type1'></div>" +
            "</div>";
        sampleLibrary.setSample(buttonNumber, defaultSamples[buttonNumber % defaultSamples.length], true);
    }

    buttonNumber = 48;
    var pianoContainer = document.getElementById("piano-container");
    for ( keyCount = 0 ; buttonNumber < 110; buttonNumber++, keyCount++ ) {
        var htmlString = "<li>";
        htmlString += "<div class=white id ='" + buttonNumber +"' onMouseDown='playKey(" + buttonNumber + ")' onMouseUp='setDrumpadInactive(" + buttonNumber + ")'></div>";
        if (!(keyCount % 7 == 2 || keyCount % 7 == 6)) {
            sampleLibrary.setSample(buttonNumber, defaultSamples[buttonNumber % defaultSamples.length], true);
            buttonNumber++;
            htmlString += "<div class=black id ='" + buttonNumber +"' onMouseDown='playKey(" + buttonNumber + ")' onMouseUp='setDrumpadInactive(" + buttonNumber + ")'></div>";
        }
        htmlString += "</li>";
        pianoContainer.innerHTML += htmlString;
        sampleLibrary.setSample(buttonNumber, defaultSamples[buttonNumber % defaultSamples.length], true);

    }
    jQuery("input#fileChooser").change(function () {
        chooseLocal(sampleLibrary.chosenKey);
    });

//     jQuery("input#volumeCOntroller").change(function () {
//         console.log($('#volumeController').value);
//         sampleLibrary.setVolume($('#volumeController').value);
//     });
}
function setCurrent(keyNumber) {
    setDrumpadInactive(sampleLibrary.chosenKey);
    sampleLibrary.chosenKey = keyNumber;
    setDrumpadActive(keyNumber);
}

function dropboxChooser() {
    chooseDropbox(sampleLibrary.chosenKey);
}

function localChooser() {
    document.getElementById("fileChooser").click();
}

function chooseDropbox(buttonNumber) {
    var options = {
        success: function(files) {
            sampleLibrary.setSample(buttonNumber, files[0]);
        },
        multiselect: false,
        linkType: "direct",
        extenstions: ['audio'],
    }
    Dropbox.choose(options);
}

function chooseLocal(buttonNumber) {
    var file = document.getElementById("fileChooser").files[0];
    var value = {};
    value["link"] = window.URL.createObjectURL(file);
    value["name"] = file.name;
    sampleLibrary.setSample(buttonNumber, value);
    clearLocal(buttonNumber);
}

function clearLocal(buttonNumber) {
    document.getElementById("fileChooser").value = "";
}

function playKey(key) {
    sampleLibrary.play(key);
    // setDrumpadInactive(oldKey);  
    setDrumpadActive(key);
}

function setDrumpadActive(id) {
    var noteNumber = sampleLibrary.chosenKey;
    var sampleName;
    if (sampleLibrary.metadata[noteNumber])
        sampleName = sampleLibrary.metadata[noteNumber].name;
    else
        sampleName = "empty";
    setLcd(noteNumber, sampleName);
    $("#"+id).css("box-shadow", "-1px 0 15px rgba(0, 0, 0, .7) inset");
    $("#"+id).css("-webkit-box-shadow", "-1px 0 15px rgba(0, 0, 0, .7) inset");
    $("#"+id).css("-moz-box-shadow", "-1px 0 15px rgba(0, 0, 0, .7) inset");
    $("#"+id).css("-ms-box-shadow", "-1px 0 15px rgba(0, 0, 0, .7) inset");
}

function setDrumpadInactive(id) {
    $("#"+id).css("box-shadow", "");
    $("#"+id).css("-webkit-box-shadow", "");
    $("#"+id).css("-moz-box-shadow", "");
    $("#"+id).css("-ms-box-shadow", "");
    clearLcd();
}


function spotifyChooser(){

  var url = $('#spotify-url').val();
  var start = $('#spotify-url-start').val();
  var stop = $('#spotify-url-stop').val();
  var keyNum = sampleLibrary.chosenKey;

      if ($('#spotify-url').val()==="") {
        console.log("no url");
      }
      else {
        chooseSpotifyPreviewURL(keyNum, url);
        setStartAndStop(keyNum, start, stop);

      }
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

function setLcd(noteNumber, name) {
    var note = calcNoteFromNumber(noteNumber);
    $(noteName).html(note);
    $(fileName).html(name);
}

function clearLcd() {
    $(noteName).empty();
    $(fileName).empty();
}

function calcNoteFromNumber(number) {
    number = number;
    var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var octave = Math.floor(number / 12);
    var note = notes[number % 12];
    return "" + note + octave;
}

function init() {
    //Create an array with all the key indexes
    var keys = [];
    for (var i = 21; i <= 108; i++) {
        keys.push( i );
    }
    var buttonNumber = 1;

    var beatpad = document.getElementById("beatpad");
    for ( ; buttonNumber < 17; buttonNumber++) {
        beatpad.innerHTML += "<div id='" + buttonNumber + "' class='drumpad' onClick=\"setCurrent(" + buttonNumber + ")\">";
        beatpad.innerHTML += "</div>";
        sampleLibrary.setSample(buttonNumber, null);
    }

    var knobs = document.getElementById("knobs");
    for ( ; buttonNumber < 47; buttonNumber++ ) {
        knobs.innerHTML += "<div class='twist' id='" + buttonNumber + "' onclick='setCurrent(" + buttonNumber + ")'>" +
            "<div class='circlebase type1'></div>" +
            "</div>";
        sampleLibrary.setSample(buttonNumber, null);
    }

    buttonNumber = 48;
    var pianoContainer = document.getElementById("piano-container");
    for ( keyCount = 0 ; buttonNumber < 110; buttonNumber++, keyCount++ ) {
        var htmlString = "<li>";
        htmlString += "<div class=white id ='" + buttonNumber +"' onclick='setCurrent(" + buttonNumber + ")'></div>";
        console.log(keyCount % 8);
        if (!(keyCount % 7 == 2 || keyCount % 7 == 6)) {
            buttonNumber++;            
            htmlString += "<div class=black id ='" + buttonNumber +"' onclick='setCurrent(" + buttonNumber + ")'></div>";
        }
        htmlString += "</li>";
        pianoContainer.innerHTML += htmlString;
        sampleLibrary.setSample(buttonNumber, null);
    }
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
    chooseLocal(sampleLibrary.chosenKey);
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
    document.getElementById(buttonNumber).getElementsByTagName("input")[1].value = "";
}

function playKey(key) {
  console.log("play " + key);
  sampleLibrary.play(key);
  setDrumpadInactive(key);
}

function setDrumpadActive(id) {
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
    
}

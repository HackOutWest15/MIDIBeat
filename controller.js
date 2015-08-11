function init() {
    //Create an array with all the key indexes
    var keys = [];
    for (var i = 21; i <= 108; i++) {
        keys.push( i );
    }
    // for (var i = 0; i < keys.length; i++) {
    //     var buttonNumber = keys[i];
    //     document.getElementById('chooser').innerHTML +=
    //         "<div class='keyController' id=\"" + buttonNumber + "\">" +
    //         "<span class='keyController'>" +
    //         buttonNumber + 
    //         "<br>" +
    //         "<div id='name" + buttonNumber + "'>&nbsp;</div>" +
    //         "<input class=\"chooseButton\" type=\"image\" src=\"./resources/dropbox-button.png\" value=\"Dropbox\" onClick=\"chooseDropbox(" + buttonNumber + ")\"></input>" +
    //         "<br>" +
    //         "<input class=\"chooseButton\" type=\"file\" value=\"Upload\" onChange=\"chooseLocal(" + buttonNumber + ")\"></input>";
    //         "</span>" +
    //         "</div>";
    // }

    var buttonNumber = 21;

    var beatpad = document.getElementById("beatpad");
    for ( ; buttonNumber < 30; buttonNumber++) {
        beatpad.innerHTML += "<div id='" + buttonNumber + "' class='drumpad' onClick=\"chooseDropbox(" + buttonNumber + ")\">";
        beatpad.innerHTML += "</div>";
        sampleLibrary.setSample(buttonNumber, null);
    }
}

function chooseDropbox(buttonNumber) {
    var options = {
        success: function(files) {
            sampleLibrary.setSample(buttonNumber, files[0]);
            setName(buttonNumber, files[0].name);
        },
        multiselect: false,
        linkType: "direct",
        extenstions: ['audio'],
    }
    Dropbox.choose(options); 
}

function chooseLocal(buttonNumber) {
    var file = document.getElementById(buttonNumber).getElementsByTagName("input")[1].files[0];
    var value = {};
    value["link"] = window.URL.createObjectURL(file);
    value["name"] = file.name;
    sampleLibrary.setSample(buttonNumber, value);
    setName(buttonNumber, value["name"]);
    clearLocal(buttonNumber);
}

function clearLocal(buttonNumber) {
    document.getElementById(buttonNumber).getElementsByTagName("input")[1].value = "";
}

function setName(buttonNumber, name) {
    document.getElementById("name" + buttonNumber).innerHTML = name;    
}

function playKey(key) {
  console.log("play " + key);
  setDrumpadActive(key);
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

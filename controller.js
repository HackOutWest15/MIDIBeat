function init() {
    //Create an array with all the key indexes
    var keys = [];
    for (var i = 21; i <= 108; i++) {
        keys.push( i );
    }
    var sampleLibrary = new SampleLibrary();
    for (var i = 0; i < keys.length; i++) {
        var buttonNumber = keys[i];
        document.getElementById('chooser').innerHTML +=
            "<div id=\"" + buttonNumber + "\">" +
            "<input type=button value=\"" + buttonNumber + "\"></input>" +
            "</div>";
        sampleLibrary.setSample(buttonNumber, null);
    }
}

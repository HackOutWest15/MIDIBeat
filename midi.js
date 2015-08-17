var midi, data;

// Request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    console.log("No MIDI support in your browser =( ...  try Chrome");
}


// Midi functions
function onMIDISuccess(midiAccess) {
    midi = midiAccess;
    var inputs = midi.inputs.values();

    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIMessage(midiMessage) {
    data = midiMessage.data;
    console.log(data);
    if(data[0]==144 || data[0] ==153){
        playKey(data[1]);
    }
    if(data[0]==128) {
        setDrumpadInactive(data[1]);
    }
}

function onMIDIFailure(error) {
    console.log("Failed. " + error);
}

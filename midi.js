var midi, data;

// Request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser =( ...  try Chrome");
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
    console.log(midiMessage.data); 	// midi data => [command/channel, note, velocity]
}

function onMIDIFailure(error) {
    console.log("Failed. " + error);
}

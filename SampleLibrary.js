function SampleLibrary() {
    this.chosenKey = 1;
    this.samples = {};
    this.metadata = {};
    //this.start = 0;
    //this.stop = 30;

}
SampleLibrary.prototype.setSample = function(key, value, isLink) {
    if (isLink) {
        this.samples[key] = new Audio(value);
        this.metadata[key] = {};
        this.metadata[key].name = value.substring(value.lastIndexOf('/')+1);
    }
    else if (value) {
        this.samples[key] = new Audio(value.link);
        this.metadata[key] = value;
    }
}

SampleLibrary.prototype.setSpotifySample = function(key, value) {
    if (value)
        this.samples[key] = value;

    this.metadata[key] = value;
}


SampleLibrary.prototype.play = function (key) {
    var audio = this.samples[key];
    this.chosenKey = key;
    if (audio) {
        audio.currentTime = 0;
		audio.play();
    }
}

SampleLibrary.prototype.setStartStop = function (key, start, stop){
  this.samples[key].start = start;
  this.samples[key].stop = stop;
}

SampleLibrary.setVolume = function (newVol) {
    var sample = this.samples[this.chosenKey];
    if (sample) {
        sample.volume = newVol;
    }
}

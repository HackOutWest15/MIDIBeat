function SampleLibrary() {
    this.samples = {};
    this.metadata = {};
    //this.start = 0;
    //this.stop = 30;

}
SampleLibrary.prototype.setSample = function(key, value) {
    if (value)
        this.samples[key] = new Audio(value.link);

    this.metadata[key] = value;
}

SampleLibrary.prototype.setSpotifySample = function(key, value) {
    if (value)
        this.samples[key] = value;

    this.metadata[key] = value;
}


SampleLibrary.prototype.play = function (key) {

    var audio = this.samples[key];
		audio.play();
    
		int = setInterval(function() {
	        if (audio.currentTime > audio.stop) {
	            audio.pause();
	            clearInterval();
	        }
	        //console.log(audio.currentTime);
    	}, 10);
    audio.currentTime = audio.start;
}

SampleLibrary.prototype.setStartStop = function (key, start, stop){
  this.samples[key].start = start;
  this.samples[key].stop = stop;
}

function SampleLibrary() {
    this.samples = {};

}
SampleLibrary.prototype.setSample = function(key, value) {
    this.samples[key] = value;
}

SampleLibrary.prototype.play = function (key) {
    var audio = new Audio(this.samples[key].link);
    thissound.currentTime=0;
    audio.play();
}

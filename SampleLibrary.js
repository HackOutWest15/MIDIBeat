function SampleLibrary() {
    this.samples = {};
    this.metadata = {};

}
SampleLibrary.prototype.setSample = function(key, value) {
    if (value)
        this.samples[key] = new Audio(value.link);
    this.metadata[key] = value;
}

SampleLibrary.prototype.play = function (key) {
    //var audio = this.samples[key];
    this.samples[key].currentTime = 0;
    this.samples[key].play();
}

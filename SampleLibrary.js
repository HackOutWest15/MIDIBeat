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
    var audio = this.samples[key];
    audio.play();
}

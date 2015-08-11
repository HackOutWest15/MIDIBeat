function SampleLibrary() {
    this.samples = {};

}
SampleLibrary.prototype.setSample = function(key, value) {
    this.samples[key] = value;
}


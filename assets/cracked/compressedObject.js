var u = require("./external");
var h = require("./stream/DataWorker");
var a = require("./stream/Crc32Probe");
var c = require("./stream/DataLengthProbe");
function d(p, f, S, _, x) {
  this.compressedSize = p;
  this.uncompressedSize = f;
  this.crc32 = S;
  this.compression = _;
  this.compressedContent = x;
}
d.prototype = {
  getContentWorker: function () {
    var p = new h(u.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new c("data_length"));
    var f = this;
    p.on("end", function () {
      if (this.streamInfo.data_length !== f.uncompressedSize) {
        throw new Error("Bug : uncompressed data size mismatch");
      }
    });
    return p;
  },
  getCompressedWorker: function () {
    return new h(u.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
  }
};
d.createWorkerFrom = function (p, f, S) {
  return p.pipe(new a()).pipe(new c("uncompressedSize")).pipe(f.compressWorker(S)).pipe(new c("compressedSize")).withStreamInfo("compression", f);
};
module.exports = d;
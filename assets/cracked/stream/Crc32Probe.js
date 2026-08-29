var u = require("./GenericWorker");
var h = require("../crc32");
function a() {
  u.call(this, "Crc32Probe");
  this.withStreamInfo("crc32", 0);
}
require("../utils").inherits(a, u);
a.prototype.processChunk = function (c) {
  this.streamInfo.crc32 = h(c.data, this.streamInfo.crc32 || 0);
  this.push(c);
};
module.exports = a;
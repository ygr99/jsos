var u = require("../utils");
var h = require("./GenericWorker");
function a(c) {
  h.call(this, "DataLengthProbe for " + c);
  this.propName = c;
  this.withStreamInfo(c, 0);
}
u.inherits(a, h);
a.prototype.processChunk = function (c) {
  if (c) {
    var d = this.streamInfo[this.propName] || 0;
    this.streamInfo[this.propName] = d + c.data.length;
  }
  h.prototype.processChunk.call(this, c);
};
module.exports = a;
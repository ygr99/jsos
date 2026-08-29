var u = require("./DataReader");
function h(a) {
  u.call(this, a);
}
require("../utils").inherits(h, u);
h.prototype.byteAt = function (a) {
  return this.data.charCodeAt(this.zero + a);
};
h.prototype.lastIndexOfSignature = function (a) {
  return this.data.lastIndexOf(a) - this.zero;
};
h.prototype.readAndCheckSignature = function (a) {
  return a === this.readData(4);
};
h.prototype.readData = function (a) {
  this.checkOffset(a);
  var c = this.data.slice(this.zero + this.index, this.zero + this.index + a);
  this.index += a;
  return c;
};
module.exports = h;
var u = require("./ArrayReader");
function h(a) {
  u.call(this, a);
}
require("../utils").inherits(h, u);
h.prototype.readData = function (a) {
  this.checkOffset(a);
  if (a === 0) {
    return new Uint8Array(0);
  }
  var c = this.data.subarray(this.zero + this.index, this.zero + this.index + a);
  this.index += a;
  return c;
};
module.exports = h;
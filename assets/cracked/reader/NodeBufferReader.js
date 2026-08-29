var u = require("./Uint8ArrayReader");
function h(a) {
  u.call(this, a);
}
require("../utils").inherits(h, u);
h.prototype.readData = function (a) {
  this.checkOffset(a);
  var c = this.data.slice(this.zero + this.index, this.zero + this.index + a);
  this.index += a;
  return c;
};
module.exports = h;
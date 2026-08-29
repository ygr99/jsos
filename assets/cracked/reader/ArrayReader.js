var u = require("./DataReader");
function h(a) {
  u.call(this, a);
  for (var c = 0; c < this.data.length; c++) {
    a[c] = a[c] & 255;
  }
}
require("../utils").inherits(h, u);
h.prototype.byteAt = function (a) {
  return this.data[this.zero + a];
};
h.prototype.lastIndexOfSignature = function (a) {
  var c = a.charCodeAt(0);
  var d = a.charCodeAt(1);
  var p = a.charCodeAt(2);
  var f = a.charCodeAt(3);
  for (var S = this.length - 4; S >= 0; --S) {
    if (this.data[S] === c && this.data[S + 1] === d && this.data[S + 2] === p && this.data[S + 3] === f) {
      return S - this.zero;
    }
  }
  return -1;
};
h.prototype.readAndCheckSignature = function (a) {
  var c = a.charCodeAt(0);
  var d = a.charCodeAt(1);
  var p = a.charCodeAt(2);
  var f = a.charCodeAt(3);
  var S = this.readData(4);
  return c === S[0] && d === S[1] && p === S[2] && f === S[3];
};
h.prototype.readData = function (a) {
  this.checkOffset(a);
  if (a === 0) {
    return [];
  }
  var c = this.data.slice(this.zero + this.index, this.zero + this.index + a);
  this.index += a;
  return c;
};
module.exports = h;
var u = require("../utils");
function h(a) {
  this.data = a;
  this.length = a.length;
  this.index = 0;
  this.zero = 0;
}
h.prototype = {
  checkOffset: function (a) {
    this.checkIndex(this.index + a);
  },
  checkIndex: function (a) {
    if (this.length < this.zero + a || a < 0) {
      throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?");
    }
  },
  setIndex: function (a) {
    this.checkIndex(a);
    this.index = a;
  },
  skip: function (a) {
    this.setIndex(this.index + a);
  },
  byteAt: function () {},
  readInt: function (a) {
    var c;
    var d = 0;
    this.checkOffset(a);
    c = this.index + a - 1;
    for (; c >= this.index; c--) {
      d = (d << 8) + this.byteAt(c);
    }
    this.index += a;
    return d;
  },
  readString: function (a) {
    return u.transformTo("string", this.readData(a));
  },
  readData: function () {},
  lastIndexOfSignature: function () {},
  readAndCheckSignature: function () {},
  readDate: function () {
    var a = this.readInt(4);
    return new Date(Date.UTC(1980 + (a >> 25 & 127), (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (a & 31) << 1));
  }
};
module.exports = h;
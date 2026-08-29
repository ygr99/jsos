var u = require("readable-stream").Readable;
function h(a, c, d) {
  u.call(this, c);
  this._helper = a;
  var p = this;
  a.on("data", function (f, S) {
    if (!p.push(f)) {
      p._helper.pause();
    }
    if (d) {
      d(S);
    }
  }).on("error", function (f) {
    p.emit("error", f);
  }).on("end", function () {
    p.push(null);
  });
}
require("../utils").inherits(h, u);
h.prototype._read = function () {
  this._helper.resume();
};
module.exports = h;
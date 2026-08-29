var u = require("../utils");
var h = require("../stream/GenericWorker");
function a(c, d) {
  h.call(this, "Nodejs stream input adapter for " + c);
  this._upstreamEnded = false;
  this._bindStream(d);
}
u.inherits(a, h);
a.prototype._bindStream = function (c) {
  var d = this;
  (this._stream = c).pause();
  c.on("data", function (p) {
    d.push({
      data: p,
      meta: {
        percent: 0
      }
    });
  }).on("error", function (p) {
    if (d.isPaused) {
      this.generatedError = p;
    } else {
      d.error(p);
    }
  }).on("end", function () {
    if (d.isPaused) {
      d._upstreamEnded = true;
    } else {
      d.end();
    }
  });
};
a.prototype.pause = function () {
  return !!h.prototype.pause.call(this) && (this._stream.pause(), true);
};
a.prototype.resume = function () {
  return !!h.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
};
module.exports = a;
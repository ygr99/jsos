var u = require("../utils");
var h = require("./GenericWorker");
function a(c) {
  h.call(this, "DataWorker");
  var d = this;
  this.dataIsReady = false;
  this.index = 0;
  this.max = 0;
  this.data = null;
  this.type = "";
  this._tickScheduled = false;
  c.then(function (p) {
    d.dataIsReady = true;
    d.data = p;
    d.max = p && p.length || 0;
    d.type = u.getTypeOf(p);
    if (!d.isPaused) {
      d._tickAndRepeat();
    }
  }, function (p) {
    d.error(p);
  });
}
u.inherits(a, h);
a.prototype.cleanUp = function () {
  h.prototype.cleanUp.call(this);
  this.data = null;
};
a.prototype.resume = function () {
  return !!h.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, u.delay(this._tickAndRepeat, [], this)), true);
};
a.prototype._tickAndRepeat = function () {
  this._tickScheduled = false;
  if (!this.isPaused && !this.isFinished) {
    this._tick();
    if (!this.isFinished) {
      u.delay(this._tickAndRepeat, [], this);
      this._tickScheduled = true;
    }
  }
};
a.prototype._tick = function () {
  if (this.isPaused || this.isFinished) {
    return false;
  }
  var c = null;
  var d = Math.min(this.max, this.index + 16384);
  if (this.index >= this.max) {
    return this.end();
  }
  switch (this.type) {
    case "string":
      c = this.data.substring(this.index, d);
      break;
    case "uint8array":
      c = this.data.subarray(this.index, d);
      break;
    case "array":
    case "nodebuffer":
      c = this.data.slice(this.index, d);
  }
  this.index = d;
  return this.push({
    data: c,
    meta: {
      percent: this.max ? this.index / this.max * 100 : 0
    }
  });
};
module.exports = a;
var u = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
var h = require("pako");
var a = require("./utils");
var c = require("./stream/GenericWorker");
var d = u ? "uint8array" : "array";
function p(f, S) {
  c.call(this, "FlateWorker/" + f);
  this._pako = null;
  this._pakoAction = f;
  this._pakoOptions = S;
  this.meta = {};
}
exports.magic = "\b\0";
a.inherits(p, c);
p.prototype.processChunk = function (f) {
  this.meta = f.meta;
  if (this._pako === null) {
    this._createPako();
  }
  this._pako.push(a.transformTo(d, f.data), false);
};
p.prototype.flush = function () {
  c.prototype.flush.call(this);
  if (this._pako === null) {
    this._createPako();
  }
  this._pako.push([], true);
};
p.prototype.cleanUp = function () {
  c.prototype.cleanUp.call(this);
  this._pako = null;
};
p.prototype._createPako = function () {
  this._pako = new h[this._pakoAction]({
    raw: true,
    level: this._pakoOptions.level || -1
  });
  var f = this;
  this._pako.onData = function (S) {
    f.push({
      data: S,
      meta: f.meta
    });
  };
};
exports.compressWorker = function (f) {
  return new p("Deflate", f);
};
exports.uncompressWorker = function () {
  return new p("Inflate", {});
};
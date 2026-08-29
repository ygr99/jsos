function u(x, w, g) {
  this.name = x;
  this.dir = g.dir;
  this.date = g.date;
  this.comment = g.comment;
  this.unixPermissions = g.unixPermissions;
  this.dosPermissions = g.dosPermissions;
  this._data = w;
  this._dataBinary = g.binary;
  this.options = {
    compression: g.compression,
    compressionOptions: g.compressionOptions
  };
}
var h = require("./stream/StreamHelper");
var a = require("./stream/DataWorker");
var c = require("./utf8");
var d = require("./compressedObject");
var p = require("./stream/GenericWorker");
u.prototype = {
  internalStream: function (x) {
    var w = null;
    var g = "string";
    try {
      if (!x) {
        throw new Error("No output type specified.");
      }
      var b = (g = x.toLowerCase()) === "string" || g === "text";
      if (g === "binarystring" || g === "text") {
        g = "string";
      }
      w = this._decompressWorker();
      var m = !this._dataBinary;
      if (m && !b) {
        w = w.pipe(new c.Utf8EncodeWorker());
      }
      if (!m && b) {
        w = w.pipe(new c.Utf8DecodeWorker());
      }
    } catch (v) {
      (w = new p("error")).error(v);
    }
    return new h(w, g, "");
  },
  async: function (x, w) {
    return this.internalStream(x).accumulate(w);
  },
  nodeStream: function (x, w) {
    return this.internalStream(x || "nodebuffer").toNodejsStream(w);
  },
  _compressWorker: function (x, w) {
    if (this._data instanceof d && this._data.compression.magic === x.magic) {
      return this._data.getCompressedWorker();
    }
    var g = this._decompressWorker();
    if (!this._dataBinary) {
      g = g.pipe(new c.Utf8EncodeWorker());
    }
    return d.createWorkerFrom(g, x, w);
  },
  _decompressWorker: function () {
    if (this._data instanceof d) {
      return this._data.getContentWorker();
    } else if (this._data instanceof p) {
      return this._data;
    } else {
      return new a(this._data);
    }
  }
};
for (var f = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], S = function () {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  }, _ = 0; _ < f.length; _++) {
  u.prototype[f[_]] = S;
}
module.exports = u;
var u = require("../utils");
var h = require("./ConvertWorker");
var a = require("./GenericWorker");
var c = require("../base64");
var d = require("../support");
var p = require("../external");
var f = null;
if (d.nodestream) {
  try {
    f = require("../nodejs/NodejsStreamOutputAdapter");
  } catch {}
}
function S(x, w) {
  return new p.Promise(function (g, b) {
    var m = [];
    var v = x._internalType;
    var C = x._outputType;
    var T = x._mimeType;
    x.on("data", function (A, M) {
      m.push(A);
      if (w) {
        w(M);
      }
    }).on("error", function (A) {
      m = [];
      b(A);
    }).on("end", function () {
      try {
        var A = function (M, R, I) {
          switch (M) {
            case "blob":
              return u.newBlob(u.transformTo("arraybuffer", R), I);
            case "base64":
              return c.encode(R);
            default:
              return u.transformTo(M, R);
          }
        }(C, function (M, R) {
          var I;
          var j = 0;
          var W = null;
          var z = 0;
          for (I = 0; I < R.length; I++) {
            z += R[I].length;
          }
          switch (M) {
            case "string":
              return R.join("");
            case "array":
              return Array.prototype.concat.apply([], R);
            case "uint8array":
              W = new Uint8Array(z);
              I = 0;
              for (; I < R.length; I++) {
                W.set(R[I], j);
                j += R[I].length;
              }
              return W;
            case "nodebuffer":
              return Buffer.concat(R);
            default:
              throw new Error("concat : unsupported type '" + M + "'");
          }
        }(v, m), T);
        g(A);
      } catch (M) {
        b(M);
      }
      m = [];
    }).resume();
  });
}
function _(x, w, g) {
  var b = w;
  switch (w) {
    case "blob":
    case "arraybuffer":
      b = "uint8array";
      break;
    case "base64":
      b = "string";
  }
  try {
    this._internalType = b;
    this._outputType = w;
    this._mimeType = g;
    u.checkSupport(b);
    this._worker = x.pipe(new h(b));
    x.lock();
  } catch (m) {
    this._worker = new a("error");
    this._worker.error(m);
  }
}
_.prototype = {
  accumulate: function (x) {
    return S(this, x);
  },
  on: function (x, w) {
    var g = this;
    if (x === "data") {
      this._worker.on(x, function (b) {
        w.call(g, b.data, b.meta);
      });
    } else {
      this._worker.on(x, function () {
        u.delay(w, arguments, g);
      });
    }
    return this;
  },
  resume: function () {
    u.delay(this._worker.resume, [], this._worker);
    return this;
  },
  pause: function () {
    this._worker.pause();
    return this;
  },
  toNodejsStream: function (x) {
    u.checkSupport("nodestream");
    if (this._outputType !== "nodebuffer") {
      throw new Error(this._outputType + " is not supported by this method");
    }
    return new f(this, {
      objectMode: this._outputType !== "nodebuffer"
    }, x);
  }
};
module.exports = _;
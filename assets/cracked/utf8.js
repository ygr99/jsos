var u = require("./utils");
var h = require("./support");
var a = require("./nodejsUtils");
var c = require("./stream/GenericWorker");
var d = new Array(256);
for (var p = 0; p < 256; p++) {
  d[p] = p >= 252 ? 6 : p >= 248 ? 5 : p >= 240 ? 4 : p >= 224 ? 3 : p >= 192 ? 2 : 1;
}
d[254] = d[254] = 1;
function f() {
  c.call(this, "utf-8 decode");
  this.leftOver = null;
}
function S() {
  c.call(this, "utf-8 encode");
}
exports.utf8encode = function (_) {
  if (h.nodebuffer) {
    return a.newBufferFrom(_, "utf-8");
  } else {
    return function (x) {
      var w;
      var g;
      var b;
      var m;
      var v;
      var C = x.length;
      var T = 0;
      for (m = 0; m < C; m++) {
        if (((g = x.charCodeAt(m)) & 64512) == 55296 && m + 1 < C && ((b = x.charCodeAt(m + 1)) & 64512) == 56320) {
          g = 65536 + (g - 55296 << 10) + (b - 56320);
          m++;
        }
        T += g < 128 ? 1 : g < 2048 ? 2 : g < 65536 ? 3 : 4;
      }
      w = h.uint8array ? new Uint8Array(T) : new Array(T);
      m = v = 0;
      for (; v < T; m++) {
        if (((g = x.charCodeAt(m)) & 64512) == 55296 && m + 1 < C && ((b = x.charCodeAt(m + 1)) & 64512) == 56320) {
          g = 65536 + (g - 55296 << 10) + (b - 56320);
          m++;
        }
        if (g < 128) {
          w[v++] = g;
        } else {
          if (g < 2048) {
            w[v++] = g >>> 6 | 192;
          } else {
            if (g < 65536) {
              w[v++] = g >>> 12 | 224;
            } else {
              w[v++] = g >>> 18 | 240;
              w[v++] = g >>> 12 & 63 | 128;
            }
            w[v++] = g >>> 6 & 63 | 128;
          }
          w[v++] = g & 63 | 128;
        }
      }
      return w;
    }(_);
  }
};
exports.utf8decode = function (_) {
  if (h.nodebuffer) {
    return u.transformTo("nodebuffer", _).toString("utf-8");
  } else {
    return function (x) {
      var w;
      var g;
      var b;
      var m;
      var v = x.length;
      var C = new Array(v * 2);
      for (w = g = 0; w < v;) {
        if ((b = x[w++]) < 128) {
          C[g++] = b;
        } else if ((m = d[b]) > 4) {
          C[g++] = 65533;
          w += m - 1;
        } else {
          for (b &= m === 2 ? 31 : m === 3 ? 15 : 7; m > 1 && w < v;) {
            b = b << 6 | x[w++] & 63;
            m--;
          }
          if (m > 1) {
            C[g++] = 65533;
          } else if (b < 65536) {
            C[g++] = b;
          } else {
            b -= 65536;
            C[g++] = b >> 10 & 1023 | 55296;
            C[g++] = b & 1023 | 56320;
          }
        }
      }
      if (C.length !== g) {
        if (C.subarray) {
          C = C.subarray(0, g);
        } else {
          C.length = g;
        }
      }
      return u.applyFromCharCode(C);
    }(_ = u.transformTo(h.uint8array ? "uint8array" : "array", _));
  }
};
u.inherits(f, c);
f.prototype.processChunk = function (_) {
  var x = u.transformTo(h.uint8array ? "uint8array" : "array", _.data);
  if (this.leftOver && this.leftOver.length) {
    if (h.uint8array) {
      var w = x;
      (x = new Uint8Array(w.length + this.leftOver.length)).set(this.leftOver, 0);
      x.set(w, this.leftOver.length);
    } else {
      x = this.leftOver.concat(x);
    }
    this.leftOver = null;
  }
  var g = function (m, v) {
    var C;
    if ((v = v || m.length) > m.length) {
      v = m.length;
    }
    C = v - 1;
    while (C >= 0 && (m[C] & 192) == 128) {
      C--;
    }
    if (C < 0 || C === 0) {
      return v;
    } else if (C + d[m[C]] > v) {
      return C;
    } else {
      return v;
    }
  }(x);
  var b = x;
  if (g !== x.length) {
    if (h.uint8array) {
      b = x.subarray(0, g);
      this.leftOver = x.subarray(g, x.length);
    } else {
      b = x.slice(0, g);
      this.leftOver = x.slice(g, x.length);
    }
  }
  this.push({
    data: exports.utf8decode(b),
    meta: _.meta
  });
};
f.prototype.flush = function () {
  if (this.leftOver && this.leftOver.length) {
    this.push({
      data: exports.utf8decode(this.leftOver),
      meta: {}
    });
    this.leftOver = null;
  }
};
exports.Utf8DecodeWorker = f;
u.inherits(S, c);
S.prototype.processChunk = function (_) {
  this.push({
    data: exports.utf8encode(_.data),
    meta: _.meta
  });
};
exports.Utf8EncodeWorker = S;
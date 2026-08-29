var u = require("./support");
var h = require("./base64");
var a = require("./nodejsUtils");
var c = require("./external");
function d(w) {
  return w;
}
function p(w, g) {
  for (var b = 0; b < w.length; ++b) {
    g[b] = w.charCodeAt(b) & 255;
  }
  return g;
}
require("setimmediate");
exports.newBlob = function (w, g) {
  exports.checkSupport("blob");
  try {
    return new Blob([w], {
      type: g
    });
  } catch {
    try {
      var b = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
      b.append(w);
      return b.getBlob(g);
    } catch {
      throw new Error("Bug : can't construct the Blob.");
    }
  }
};
var f = {
  stringifyByChunk: function (w, g, b) {
    var m = [];
    var v = 0;
    var C = w.length;
    if (C <= b) {
      return String.fromCharCode.apply(null, w);
    }
    while (v < C) {
      if (g === "array" || g === "nodebuffer") {
        m.push(String.fromCharCode.apply(null, w.slice(v, Math.min(v + b, C))));
      } else {
        m.push(String.fromCharCode.apply(null, w.subarray(v, Math.min(v + b, C))));
      }
      v += b;
    }
    return m.join("");
  },
  stringifyByChar: function (w) {
    var g = "";
    for (var b = 0; b < w.length; b++) {
      g += String.fromCharCode(w[b]);
    }
    return g;
  },
  applyCanBeUsed: {
    uint8array: function () {
      try {
        return u.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
      } catch {
        return false;
      }
    }(),
    nodebuffer: function () {
      try {
        return u.nodebuffer && String.fromCharCode.apply(null, a.allocBuffer(1)).length === 1;
      } catch {
        return false;
      }
    }()
  }
};
function S(w) {
  var g = 65536;
  var b = exports.getTypeOf(w);
  var m = true;
  if (b === "uint8array") {
    m = f.applyCanBeUsed.uint8array;
  } else if (b === "nodebuffer") {
    m = f.applyCanBeUsed.nodebuffer;
  }
  if (m) {
    while (g > 1) {
      try {
        return f.stringifyByChunk(w, b, g);
      } catch {
        g = Math.floor(g / 2);
      }
    }
  }
  return f.stringifyByChar(w);
}
function _(w, g) {
  for (var b = 0; b < w.length; b++) {
    g[b] = w[b];
  }
  return g;
}
exports.applyFromCharCode = S;
var x = {};
x.string = {
  string: d,
  array: function (w) {
    return p(w, new Array(w.length));
  },
  arraybuffer: function (w) {
    return x.string.uint8array(w).buffer;
  },
  uint8array: function (w) {
    return p(w, new Uint8Array(w.length));
  },
  nodebuffer: function (w) {
    return p(w, a.allocBuffer(w.length));
  }
};
x.array = {
  string: S,
  array: d,
  arraybuffer: function (w) {
    return new Uint8Array(w).buffer;
  },
  uint8array: function (w) {
    return new Uint8Array(w);
  },
  nodebuffer: function (w) {
    return a.newBufferFrom(w);
  }
};
x.arraybuffer = {
  string: function (w) {
    return S(new Uint8Array(w));
  },
  array: function (w) {
    return _(new Uint8Array(w), new Array(w.byteLength));
  },
  arraybuffer: d,
  uint8array: function (w) {
    return new Uint8Array(w);
  },
  nodebuffer: function (w) {
    return a.newBufferFrom(new Uint8Array(w));
  }
};
x.uint8array = {
  string: S,
  array: function (w) {
    return _(w, new Array(w.length));
  },
  arraybuffer: function (w) {
    return w.buffer;
  },
  uint8array: d,
  nodebuffer: function (w) {
    return a.newBufferFrom(w);
  }
};
x.nodebuffer = {
  string: S,
  array: function (w) {
    return _(w, new Array(w.length));
  },
  arraybuffer: function (w) {
    return x.nodebuffer.uint8array(w).buffer;
  },
  uint8array: function (w) {
    return _(w, new Uint8Array(w.length));
  },
  nodebuffer: d
};
exports.transformTo = function (w, g) {
  g = g || "";
  if (!w) {
    return g;
  }
  exports.checkSupport(w);
  var b = exports.getTypeOf(g);
  return x[b][w](g);
};
exports.resolve = function (w) {
  for (var g = w.split("/"), b = [], m = 0; m < g.length; m++) {
    var v = g[m];
    if (v !== "." && (v !== "" || m === 0 || m === g.length - 1)) {
      if (v === "..") {
        b.pop();
      } else {
        b.push(v);
      }
    }
  }
  return b.join("/");
};
exports.getTypeOf = function (w) {
  if (typeof w == "string") {
    return "string";
  } else if (Object.prototype.toString.call(w) === "[object Array]") {
    return "array";
  } else if (u.nodebuffer && a.isBuffer(w)) {
    return "nodebuffer";
  } else if (u.uint8array && w instanceof Uint8Array) {
    return "uint8array";
  } else if (u.arraybuffer && w instanceof ArrayBuffer) {
    return "arraybuffer";
  } else {
    return undefined;
  }
};
exports.checkSupport = function (w) {
  if (!u[w.toLowerCase()]) {
    throw new Error(w + " is not supported by this platform");
  }
};
exports.MAX_VALUE_16BITS = 65535;
exports.MAX_VALUE_32BITS = -1;
exports.pretty = function (w) {
  var g;
  var b;
  var m = "";
  for (b = 0; b < (w || "").length; b++) {
    m += "\\x" + ((g = w.charCodeAt(b)) < 16 ? "0" : "") + g.toString(16).toUpperCase();
  }
  return m;
};
exports.delay = function (w, g, b) {
  setImmediate(function () {
    w.apply(b || null, g || []);
  });
};
exports.inherits = function (w, g) {
  function b() {}
  b.prototype = g.prototype;
  w.prototype = new b();
};
exports.extend = function () {
  var w;
  var g;
  var b = {};
  for (w = 0; w < arguments.length; w++) {
    for (g in arguments[w]) {
      if (Object.prototype.hasOwnProperty.call(arguments[w], g) && b[g] === undefined) {
        b[g] = arguments[w][g];
      }
    }
  }
  return b;
};
exports.prepareContent = function (w, g, b, m, v) {
  return c.Promise.resolve(g).then(function (C) {
    if (u.blob && (C instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(C)) !== -1) && typeof FileReader !== "undefined") {
      return new c.Promise(function (T, A) {
        var M = new FileReader();
        M.onload = function (R) {
          T(R.target.result);
        };
        M.onerror = function (R) {
          A(R.target.error);
        };
        M.readAsArrayBuffer(C);
      });
    } else {
      return C;
    }
  }).then(function (C) {
    var T = exports.getTypeOf(C);
    if (T) {
      if (T === "arraybuffer") {
        C = exports.transformTo("uint8array", C);
      } else if (T === "string") {
        if (v) {
          C = h.decode(C);
        } else if (b && m !== true) {
          C = function (A) {
            return p(A, u.uint8array ? new Uint8Array(A.length) : new Array(A.length));
          }(C);
        }
      }
      return C;
    } else {
      return c.Promise.reject(new Error("Can't read the data of '" + w + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
    }
  });
};
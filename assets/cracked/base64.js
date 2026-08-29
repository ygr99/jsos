var u = require("./utils");
var h = require("./support");
var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
exports.encode = function (c) {
  var d;
  var p;
  var f;
  var S;
  var _;
  var x;
  var w;
  var g = [];
  for (var b = 0, m = c.length, v = m, C = u.getTypeOf(c) !== "string"; b < c.length;) {
    v = m - b;
    f = C ? (d = c[b++], p = b < m ? c[b++] : 0, b < m ? c[b++] : 0) : (d = c.charCodeAt(b++), p = b < m ? c.charCodeAt(b++) : 0, b < m ? c.charCodeAt(b++) : 0);
    S = d >> 2;
    _ = (d & 3) << 4 | p >> 4;
    x = v > 1 ? (p & 15) << 2 | f >> 6 : 64;
    w = v > 2 ? f & 63 : 64;
    g.push(a.charAt(S) + a.charAt(_) + a.charAt(x) + a.charAt(w));
  }
  return g.join("");
};
exports.decode = function (c) {
  var d;
  var p;
  var f;
  var S;
  var _;
  var x;
  var w = 0;
  var g = 0;
  var b = "data:";
  if (c.substr(0, b.length) === b) {
    throw new Error("Invalid base64 input, it looks like a data url.");
  }
  var m;
  var v = (c = c.replace(/[^A-Za-z0-9+/=]/g, "")).length * 3 / 4;
  if (c.charAt(c.length - 1) === a.charAt(64)) {
    v--;
  }
  if (c.charAt(c.length - 2) === a.charAt(64)) {
    v--;
  }
  if (v % 1 != 0) {
    throw new Error("Invalid base64 input, bad content length.");
  }
  for (m = h.uint8array ? new Uint8Array(v | 0) : new Array(v | 0); w < c.length;) {
    d = a.indexOf(c.charAt(w++)) << 2 | (S = a.indexOf(c.charAt(w++))) >> 4;
    p = (S & 15) << 4 | (_ = a.indexOf(c.charAt(w++))) >> 2;
    f = (_ & 3) << 6 | (x = a.indexOf(c.charAt(w++)));
    m[g++] = d;
    if (_ !== 64) {
      m[g++] = p;
    }
    if (x !== 64) {
      m[g++] = f;
    }
  }
  return m;
};
var u = require("./utils");
var h = function () {
  var a;
  var c = [];
  for (var d = 0; d < 256; d++) {
    a = d;
    for (var p = 0; p < 8; p++) {
      a = a & 1 ? a >>> 1 ^ -306674912 : a >>> 1;
    }
    c[d] = a;
  }
  return c;
}();
module.exports = function (a, c) {
  if (a !== undefined && a.length) {
    if (u.getTypeOf(a) !== "string") {
      return function (d, p, f, S) {
        var _ = h;
        var x = S + f;
        d ^= -1;
        for (var w = S; w < x; w++) {
          d = d >>> 8 ^ _[(d ^ p[w]) & 255];
        }
        return d ^ -1;
      }(c | 0, a, a.length, 0);
    } else {
      return function (d, p, f, S) {
        var _ = h;
        var x = S + f;
        d ^= -1;
        for (var w = S; w < x; w++) {
          d = d >>> 8 ^ _[(d ^ p.charCodeAt(w)) & 255];
        }
        return d ^ -1;
      }(c | 0, a, a.length, 0);
    }
  } else {
    return 0;
  }
};
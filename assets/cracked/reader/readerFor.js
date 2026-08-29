var u = require("../utils");
var h = require("../support");
var a = require("./ArrayReader");
var c = require("./StringReader");
var d = require("./NodeBufferReader");
var p = require("./Uint8ArrayReader");
module.exports = function (f) {
  var S = u.getTypeOf(f);
  u.checkSupport(S);
  if (S !== "string" || h.uint8array) {
    if (S === "nodebuffer") {
      return new d(f);
    } else if (h.uint8array) {
      return new p(u.transformTo("uint8array", f));
    } else {
      return new a(u.transformTo("array", f));
    }
  } else {
    return new c(f);
  }
};
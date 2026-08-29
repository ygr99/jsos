var u = require("./GenericWorker");
var h = require("../utils");
function a(c) {
  u.call(this, "ConvertWorker to " + c);
  this.destType = c;
}
h.inherits(a, u);
a.prototype.processChunk = function (c) {
  this.push({
    data: h.transformTo(this.destType, c.data),
    meta: c.meta
  });
};
module.exports = a;
function u() {
  if (!(this instanceof u)) {
    return new u();
  }
  if (arguments.length) {
    throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
  }
  this.files = Object.create(null);
  this.comment = null;
  this.root = "";
  this.clone = function () {
    var h = new u();
    for (var a in this) {
      if (typeof this[a] != "function") {
        h[a] = this[a];
      }
    }
    return h;
  };
}
(u.prototype = require("./object")).loadAsync = require("./load");
u.support = require("./support");
u.defaults = require("./defaults");
u.version = "3.10.1";
u.loadAsync = function (h, a) {
  return new u().loadAsync(h, a);
};
u.external = require("./external");
module.exports = u;
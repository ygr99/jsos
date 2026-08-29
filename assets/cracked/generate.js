var u = require("../compressions");
var h = require("./ZipFileWorker");
exports.generateWorker = function (a, c, d) {
  var p = new h(c.streamFiles, d, c.platform, c.encodeFileName);
  var f = 0;
  try {
    a.forEach(function (S, _) {
      f++;
      var x = function (m, v) {
        var C = m || v;
        var T = u[C];
        if (!T) {
          throw new Error(C + " is not a valid compression method !");
        }
        return T;
      }(_.options.compression, c.compression);
      var w = _.options.compressionOptions || c.compressionOptions || {};
      var g = _.dir;
      var b = _.date;
      _._compressWorker(x, w).withStreamInfo("file", {
        name: S,
        dir: g,
        date: b,
        comment: _.comment || "",
        unixPermissions: _.unixPermissions,
        dosPermissions: _.dosPermissions
      }).pipe(p);
    });
    p.entriesCount = f;
  } catch (S) {
    p.error(S);
  }
  return p;
};
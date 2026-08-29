var u = require("./utils");
var h = require("./external");
var a = require("./utf8");
var c = require("./zipEntries");
var d = require("./stream/Crc32Probe");
var p = require("./nodejsUtils");
function f(S) {
  return new h.Promise(function (_, x) {
    var w = S.decompressed.getContentWorker().pipe(new d());
    w.on("error", function (g) {
      x(g);
    }).on("end", function () {
      if (w.streamInfo.crc32 !== S.decompressed.crc32) {
        x(new Error("Corrupted zip : CRC32 mismatch"));
      } else {
        _();
      }
    }).resume();
  });
}
module.exports = function (S, _) {
  var x = this;
  _ = u.extend(_ || {}, {
    base64: false,
    checkCRC32: false,
    optimizedBinaryString: false,
    createFolders: false,
    decodeFileName: a.utf8decode
  });
  if (p.isNode && p.isStream(S)) {
    return h.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
  } else {
    return u.prepareContent("the loaded zip file", S, true, _.optimizedBinaryString, _.base64).then(function (w) {
      var g = new c(_);
      g.load(w);
      return g;
    }).then(function (w) {
      var g = [h.Promise.resolve(w)];
      var b = w.files;
      if (_.checkCRC32) {
        for (var m = 0; m < b.length; m++) {
          g.push(f(b[m]));
        }
      }
      return h.Promise.all(g);
    }).then(function (w) {
      var g = w.shift();
      for (var b = g.files, m = 0; m < b.length; m++) {
        var v = b[m];
        var C = v.fileNameStr;
        var T = u.resolve(v.fileNameStr);
        x.file(T, v.decompressed, {
          binary: true,
          optimizedBinaryString: true,
          date: v.date,
          dir: v.dir,
          comment: v.fileCommentStr.length ? v.fileCommentStr : null,
          unixPermissions: v.unixPermissions,
          dosPermissions: v.dosPermissions,
          createFolders: _.createFolders
        });
        if (!v.dir) {
          x.file(T).unsafeOriginalName = C;
        }
      }
      if (g.zipComment.length) {
        x.comment = g.zipComment;
      }
      return x;
    });
  }
};
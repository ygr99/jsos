function u(_, x) {
  var w;
  var g = "";
  for (w = 0; w < x; w++) {
    g += String.fromCharCode(_ & 255);
    _ >>>= 8;
  }
  return g;
}
function h(_, x, w, g, b, m) {
  var v;
  var C;
  var T = _.file;
  var A = _.compression;
  var M = m !== d.utf8encode;
  var R = a.transformTo("string", m(T.name));
  var I = a.transformTo("string", d.utf8encode(T.name));
  var j = T.comment;
  var W = a.transformTo("string", m(j));
  var z = a.transformTo("string", d.utf8encode(j));
  var N = I.length !== T.name.length;
  var D = z.length !== j.length;
  var $ = "";
  var G = "";
  var q = "";
  var U = T.dir;
  var L = T.date;
  var F = {
    crc32: 0,
    compressedSize: 0,
    uncompressedSize: 0
  };
  if (!x || !!w) {
    F.crc32 = _.crc32;
    F.compressedSize = _.compressedSize;
    F.uncompressedSize = _.uncompressedSize;
  }
  var P = 0;
  if (x) {
    P |= 8;
  }
  if (!M && (!!N || !!D)) {
    P |= 2048;
  }
  var V = 0;
  var Z = 0;
  if (U) {
    V |= 16;
  }
  if (b === "UNIX") {
    Z = 798;
    V |= function (ne, ue) {
      var ee = ne;
      if (!ne) {
        ee = ue ? 16893 : 33204;
      }
      return (ee & 65535) << 16;
    }(T.unixPermissions, U);
  } else {
    Z = 20;
    V |= function (ne) {
      return (ne || 0) & 63;
    }(T.dosPermissions);
  }
  v = L.getUTCHours();
  v <<= 6;
  v |= L.getUTCMinutes();
  v <<= 5;
  v |= L.getUTCSeconds() / 2;
  C = L.getUTCFullYear() - 1980;
  C <<= 4;
  C |= L.getUTCMonth() + 1;
  C <<= 5;
  C |= L.getUTCDate();
  if (N) {
    G = u(1, 1) + u(p(R), 4) + I;
    $ += "up" + u(G.length, 2) + G;
  }
  if (D) {
    q = u(1, 1) + u(p(W), 4) + z;
    $ += "uc" + u(q.length, 2) + q;
  }
  var J = "";
  J += `
\0`;
  J += u(P, 2);
  J += A.magic;
  J += u(v, 2);
  J += u(C, 2);
  J += u(F.crc32, 4);
  J += u(F.compressedSize, 4);
  J += u(F.uncompressedSize, 4);
  J += u(R.length, 2);
  J += u($.length, 2);
  return {
    fileRecord: f.LOCAL_FILE_HEADER + J + R + $,
    dirRecord: f.CENTRAL_FILE_HEADER + u(Z, 2) + J + u(W.length, 2) + "\0\0\0\0" + u(V, 4) + u(g, 4) + R + $ + W
  };
}
var a = require("../utils");
var c = require("../stream/GenericWorker");
var d = require("../utf8");
var p = require("../crc32");
var f = require("../signature");
function S(_, x, w, g) {
  c.call(this, "ZipFileWorker");
  this.bytesWritten = 0;
  this.zipComment = x;
  this.zipPlatform = w;
  this.encodeFileName = g;
  this.streamFiles = _;
  this.accumulate = false;
  this.contentBuffer = [];
  this.dirRecords = [];
  this.currentSourceOffset = 0;
  this.entriesCount = 0;
  this.currentFile = null;
  this._sources = [];
}
a.inherits(S, c);
S.prototype.push = function (_) {
  var x = _.meta.percent || 0;
  var w = this.entriesCount;
  var g = this._sources.length;
  if (this.accumulate) {
    this.contentBuffer.push(_);
  } else {
    this.bytesWritten += _.data.length;
    c.prototype.push.call(this, {
      data: _.data,
      meta: {
        currentFile: this.currentFile,
        percent: w ? (x + (w - g - 1) * 100) / w : 100
      }
    });
  }
};
S.prototype.openedSource = function (_) {
  this.currentSourceOffset = this.bytesWritten;
  this.currentFile = _.file.name;
  var x = this.streamFiles && !_.file.dir;
  if (x) {
    var w = h(_, x, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
    this.push({
      data: w.fileRecord,
      meta: {
        percent: 0
      }
    });
  } else {
    this.accumulate = true;
  }
};
S.prototype.closedSource = function (_) {
  this.accumulate = false;
  var x = this.streamFiles && !_.file.dir;
  var w = h(_, x, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
  this.dirRecords.push(w.dirRecord);
  if (x) {
    this.push({
      data: function (g) {
        return f.DATA_DESCRIPTOR + u(g.crc32, 4) + u(g.compressedSize, 4) + u(g.uncompressedSize, 4);
      }(_),
      meta: {
        percent: 100
      }
    });
  } else {
    for (this.push({
      data: w.fileRecord,
      meta: {
        percent: 0
      }
    }); this.contentBuffer.length;) {
      this.push(this.contentBuffer.shift());
    }
  }
  this.currentFile = null;
};
S.prototype.flush = function () {
  var _ = this.bytesWritten;
  for (var x = 0; x < this.dirRecords.length; x++) {
    this.push({
      data: this.dirRecords[x],
      meta: {
        percent: 100
      }
    });
  }
  var w = this.bytesWritten - _;
  var g = function (b, m, v, C, T) {
    var A = a.transformTo("string", T(C));
    return f.CENTRAL_DIRECTORY_END + "\0\0\0\0" + u(b, 2) + u(b, 2) + u(m, 4) + u(v, 4) + u(A.length, 2) + A;
  }(this.dirRecords.length, w, _, this.zipComment, this.encodeFileName);
  this.push({
    data: g,
    meta: {
      percent: 100
    }
  });
};
S.prototype.prepareNextSource = function () {
  this.previous = this._sources.shift();
  this.openedSource(this.previous.streamInfo);
  if (this.isPaused) {
    this.previous.pause();
  } else {
    this.previous.resume();
  }
};
S.prototype.registerPrevious = function (_) {
  this._sources.push(_);
  var x = this;
  _.on("data", function (w) {
    x.processChunk(w);
  });
  _.on("end", function () {
    x.closedSource(x.previous.streamInfo);
    if (x._sources.length) {
      x.prepareNextSource();
    } else {
      x.end();
    }
  });
  _.on("error", function (w) {
    x.error(w);
  });
  return this;
};
S.prototype.resume = function () {
  return !!c.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? undefined : (this.end(), true));
};
S.prototype.error = function (_) {
  var x = this._sources;
  if (!c.prototype.error.call(this, _)) {
    return false;
  }
  for (var w = 0; w < x.length; w++) {
    try {
      x[w].error(_);
    } catch {}
  }
  return true;
};
S.prototype.lock = function () {
  c.prototype.lock.call(this);
  for (var _ = this._sources, x = 0; x < _.length; x++) {
    _[x].lock();
  }
};
module.exports = S;
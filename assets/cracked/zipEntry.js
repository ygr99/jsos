var u = require("./reader/readerFor");
var h = require("./utils");
var a = require("./compressedObject");
var c = require("./crc32");
var d = require("./utf8");
var p = require("./compressions");
var f = require("./support");
function S(_, x) {
  this.options = _;
  this.loadOptions = x;
}
S.prototype = {
  isEncrypted: function () {
    return (this.bitFlag & 1) == 1;
  },
  useUTF8: function () {
    return (this.bitFlag & 2048) == 2048;
  },
  readLocalPart: function (_) {
    var x;
    var w;
    _.skip(22);
    this.fileNameLength = _.readInt(2);
    w = _.readInt(2);
    this.fileName = _.readData(this.fileNameLength);
    _.skip(w);
    if (this.compressedSize === -1 || this.uncompressedSize === -1) {
      throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
    }
    if ((x = function (g) {
      for (var b in p) {
        if (Object.prototype.hasOwnProperty.call(p, b) && p[b].magic === g) {
          return p[b];
        }
      }
      return null;
    }(this.compressionMethod)) === null) {
      throw new Error("Corrupted zip : compression " + h.pretty(this.compressionMethod) + " unknown (inner file : " + h.transformTo("string", this.fileName) + ")");
    }
    this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, x, _.readData(this.compressedSize));
  },
  readCentralPart: function (_) {
    this.versionMadeBy = _.readInt(2);
    _.skip(2);
    this.bitFlag = _.readInt(2);
    this.compressionMethod = _.readString(2);
    this.date = _.readDate();
    this.crc32 = _.readInt(4);
    this.compressedSize = _.readInt(4);
    this.uncompressedSize = _.readInt(4);
    var x = _.readInt(2);
    this.extraFieldsLength = _.readInt(2);
    this.fileCommentLength = _.readInt(2);
    this.diskNumberStart = _.readInt(2);
    this.internalFileAttributes = _.readInt(2);
    this.externalFileAttributes = _.readInt(4);
    this.localHeaderOffset = _.readInt(4);
    if (this.isEncrypted()) {
      throw new Error("Encrypted zip are not supported");
    }
    _.skip(x);
    this.readExtraFields(_);
    this.parseZIP64ExtraField(_);
    this.fileComment = _.readData(this.fileCommentLength);
  },
  processAttributes: function () {
    this.unixPermissions = null;
    this.dosPermissions = null;
    var _ = this.versionMadeBy >> 8;
    this.dir = !!(this.externalFileAttributes & 16);
    if (_ == 0) {
      this.dosPermissions = this.externalFileAttributes & 63;
    }
    if (_ == 3) {
      this.unixPermissions = this.externalFileAttributes >> 16 & 65535;
    }
    if (!this.dir && this.fileNameStr.slice(-1) === "/") {
      this.dir = true;
    }
  },
  parseZIP64ExtraField: function () {
    if (this.extraFields[1]) {
      var _ = u(this.extraFields[1].value);
      if (this.uncompressedSize === h.MAX_VALUE_32BITS) {
        this.uncompressedSize = _.readInt(8);
      }
      if (this.compressedSize === h.MAX_VALUE_32BITS) {
        this.compressedSize = _.readInt(8);
      }
      if (this.localHeaderOffset === h.MAX_VALUE_32BITS) {
        this.localHeaderOffset = _.readInt(8);
      }
      if (this.diskNumberStart === h.MAX_VALUE_32BITS) {
        this.diskNumberStart = _.readInt(4);
      }
    }
  },
  readExtraFields: function (_) {
    var x;
    var w;
    var g;
    var b = _.index + this.extraFieldsLength;
    for (this.extraFields ||= {}; _.index + 4 < b;) {
      x = _.readInt(2);
      w = _.readInt(2);
      g = _.readData(w);
      this.extraFields[x] = {
        id: x,
        length: w,
        value: g
      };
    }
    _.setIndex(b);
  },
  handleUTF8: function () {
    var _ = f.uint8array ? "uint8array" : "array";
    if (this.useUTF8()) {
      this.fileNameStr = d.utf8decode(this.fileName);
      this.fileCommentStr = d.utf8decode(this.fileComment);
    } else {
      var x = this.findExtraFieldUnicodePath();
      if (x !== null) {
        this.fileNameStr = x;
      } else {
        var w = h.transformTo(_, this.fileName);
        this.fileNameStr = this.loadOptions.decodeFileName(w);
      }
      var g = this.findExtraFieldUnicodeComment();
      if (g !== null) {
        this.fileCommentStr = g;
      } else {
        var b = h.transformTo(_, this.fileComment);
        this.fileCommentStr = this.loadOptions.decodeFileName(b);
      }
    }
  },
  findExtraFieldUnicodePath: function () {
    var _ = this.extraFields[28789];
    if (_) {
      var x = u(_.value);
      if (x.readInt(1) !== 1 || c(this.fileName) !== x.readInt(4)) {
        return null;
      } else {
        return d.utf8decode(x.readData(_.length - 5));
      }
    }
    return null;
  },
  findExtraFieldUnicodeComment: function () {
    var _ = this.extraFields[25461];
    if (_) {
      var x = u(_.value);
      if (x.readInt(1) !== 1 || c(this.fileComment) !== x.readInt(4)) {
        return null;
      } else {
        return d.utf8decode(x.readData(_.length - 5));
      }
    }
    return null;
  }
};
module.exports = S;
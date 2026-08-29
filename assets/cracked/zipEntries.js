var u = require("./reader/readerFor");
var h = require("./utils");
var a = require("./signature");
var c = require("./zipEntry");
var d = require("./support");
function p(f) {
  this.files = [];
  this.loadOptions = f;
}
p.prototype = {
  checkSignature: function (f) {
    if (!this.reader.readAndCheckSignature(f)) {
      this.reader.index -= 4;
      var S = this.reader.readString(4);
      throw new Error("Corrupted zip or bug: unexpected signature (" + h.pretty(S) + ", expected " + h.pretty(f) + ")");
    }
  },
  isSignature: function (f, S) {
    var _ = this.reader.index;
    this.reader.setIndex(f);
    var x = this.reader.readString(4) === S;
    this.reader.setIndex(_);
    return x;
  },
  readBlockEndOfCentral: function () {
    this.diskNumber = this.reader.readInt(2);
    this.diskWithCentralDirStart = this.reader.readInt(2);
    this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
    this.centralDirRecords = this.reader.readInt(2);
    this.centralDirSize = this.reader.readInt(4);
    this.centralDirOffset = this.reader.readInt(4);
    this.zipCommentLength = this.reader.readInt(2);
    var f = this.reader.readData(this.zipCommentLength);
    var S = d.uint8array ? "uint8array" : "array";
    var _ = h.transformTo(S, f);
    this.zipComment = this.loadOptions.decodeFileName(_);
  },
  readBlockZip64EndOfCentral: function () {
    this.zip64EndOfCentralSize = this.reader.readInt(8);
    this.reader.skip(4);
    this.diskNumber = this.reader.readInt(4);
    this.diskWithCentralDirStart = this.reader.readInt(4);
    this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
    this.centralDirRecords = this.reader.readInt(8);
    this.centralDirSize = this.reader.readInt(8);
    this.centralDirOffset = this.reader.readInt(8);
    this.zip64ExtensibleData = {};
    var f;
    var S;
    var _;
    for (var x = this.zip64EndOfCentralSize - 44; x > 0;) {
      f = this.reader.readInt(2);
      S = this.reader.readInt(4);
      _ = this.reader.readData(S);
      this.zip64ExtensibleData[f] = {
        id: f,
        length: S,
        value: _
      };
    }
  },
  readBlockZip64EndOfCentralLocator: function () {
    this.diskWithZip64CentralDirStart = this.reader.readInt(4);
    this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
    this.disksCount = this.reader.readInt(4);
    if (this.disksCount > 1) {
      throw new Error("Multi-volumes zip are not supported");
    }
  },
  readLocalFiles: function () {
    var f;
    var S;
    for (f = 0; f < this.files.length; f++) {
      S = this.files[f];
      this.reader.setIndex(S.localHeaderOffset);
      this.checkSignature(a.LOCAL_FILE_HEADER);
      S.readLocalPart(this.reader);
      S.handleUTF8();
      S.processAttributes();
    }
  },
  readCentralDir: function () {
    var f;
    for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);) {
      (f = new c({
        zip64: this.zip64
      }, this.loadOptions)).readCentralPart(this.reader);
      this.files.push(f);
    }
    if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) {
      throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
    }
  },
  readEndOfCentral: function () {
    var f = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
    if (f < 0) {
      throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
    }
    this.reader.setIndex(f);
    var S = f;
    this.checkSignature(a.CENTRAL_DIRECTORY_END);
    this.readBlockEndOfCentral();
    if (this.diskNumber === h.MAX_VALUE_16BITS || this.diskWithCentralDirStart === h.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === h.MAX_VALUE_16BITS || this.centralDirRecords === h.MAX_VALUE_16BITS || this.centralDirSize === h.MAX_VALUE_32BITS || this.centralDirOffset === h.MAX_VALUE_32BITS) {
      this.zip64 = true;
      if ((f = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) {
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
      }
      this.reader.setIndex(f);
      this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
      this.readBlockZip64EndOfCentralLocator();
      if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) {
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
      }
      this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
      this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END);
      this.readBlockZip64EndOfCentral();
    }
    var _ = this.centralDirOffset + this.centralDirSize;
    if (this.zip64) {
      _ += 20;
      _ += 12 + this.zip64EndOfCentralSize;
    }
    var x = S - _;
    if (x > 0) {
      if (!this.isSignature(S, a.CENTRAL_FILE_HEADER)) {
        this.reader.zero = x;
      }
    } else if (x < 0) {
      throw new Error("Corrupted zip: missing " + Math.abs(x) + " bytes.");
    }
  },
  prepareReader: function (f) {
    this.reader = u(f);
  },
  load: function (f) {
    this.prepareReader(f);
    this.readEndOfCentral();
    this.readCentralDir();
    this.readLocalFiles();
  }
};
module.exports = p;
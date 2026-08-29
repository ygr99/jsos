var u = require("./stream/GenericWorker");
exports.STORE = {
  magic: "\0\0",
  compressWorker: function () {
    return new u("STORE compression");
  },
  uncompressWorker: function () {
    return new u("STORE decompression");
  }
};
exports.DEFLATE = require("./flate");
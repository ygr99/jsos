exports.base64 = true;
exports.array = true;
exports.string = true;
exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
exports.nodebuffer = typeof Buffer !== "undefined";
exports.uint8array = typeof Uint8Array !== "undefined";
if (typeof ArrayBuffer === "undefined") {
  exports.blob = false;
} else {
  var u = new ArrayBuffer(0);
  try {
    exports.blob = new Blob([u], {
      type: "application/zip"
    }).size === 0;
  } catch {
    try {
      var h = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
      h.append(u);
      exports.blob = h.getBlob("application/zip").size === 0;
    } catch {
      exports.blob = false;
    }
  }
}
try {
  exports.nodestream = !!require("readable-stream").Readable;
} catch {
  exports.nodestream = false;
}
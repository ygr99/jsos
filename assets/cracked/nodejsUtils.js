module.exports = {
  isNode: typeof Buffer !== "undefined",
  newBufferFrom: function (u, h) {
    if (Buffer.from && Buffer.from !== Uint8Array.from) {
      return Buffer.from(u, h);
    }
    if (typeof u == "number") {
      throw new Error("The \"data\" argument must not be a number");
    }
    return new Buffer(u, h);
  },
  allocBuffer: function (u) {
    if (Buffer.alloc) {
      return Buffer.alloc(u);
    }
    var h = new Buffer(u);
    h.fill(0);
    return h;
  },
  isBuffer: function (u) {
    return Buffer.isBuffer(u);
  },
  isStream: function (u) {
    return u && typeof u.on == "function" && typeof u.pause == "function" && typeof u.resume == "function";
  }
};
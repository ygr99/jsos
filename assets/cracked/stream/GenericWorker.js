function u(h) {
  this.name = h || "default";
  this.streamInfo = {};
  this.generatedError = null;
  this.extraStreamInfo = {};
  this.isPaused = true;
  this.isFinished = false;
  this.isLocked = false;
  this._listeners = {
    data: [],
    end: [],
    error: []
  };
  this.previous = null;
}
u.prototype = {
  push: function (h) {
    this.emit("data", h);
  },
  end: function () {
    if (this.isFinished) {
      return false;
    }
    this.flush();
    try {
      this.emit("end");
      this.cleanUp();
      this.isFinished = true;
    } catch (h) {
      this.emit("error", h);
    }
    return true;
  },
  error: function (h) {
    return !this.isFinished && (this.isPaused ? this.generatedError = h : (this.isFinished = true, this.emit("error", h), this.previous && this.previous.error(h), this.cleanUp()), true);
  },
  on: function (h, a) {
    this._listeners[h].push(a);
    return this;
  },
  cleanUp: function () {
    this.streamInfo = this.generatedError = this.extraStreamInfo = null;
    this._listeners = [];
  },
  emit: function (h, a) {
    if (this._listeners[h]) {
      for (var c = 0; c < this._listeners[h].length; c++) {
        this._listeners[h][c].call(this, a);
      }
    }
  },
  pipe: function (h) {
    return h.registerPrevious(this);
  },
  registerPrevious: function (h) {
    if (this.isLocked) {
      throw new Error("The stream '" + this + "' has already been used.");
    }
    this.streamInfo = h.streamInfo;
    this.mergeStreamInfo();
    this.previous = h;
    var a = this;
    h.on("data", function (c) {
      a.processChunk(c);
    });
    h.on("end", function () {
      a.end();
    });
    h.on("error", function (c) {
      a.error(c);
    });
    return this;
  },
  pause: function () {
    return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
  },
  resume: function () {
    if (!this.isPaused || this.isFinished) {
      return false;
    }
    var h = this.isPaused = false;
    if (this.generatedError) {
      this.error(this.generatedError);
      h = true;
    }
    if (this.previous) {
      this.previous.resume();
    }
    return !h;
  },
  flush: function () {},
  processChunk: function (h) {
    this.push(h);
  },
  withStreamInfo: function (h, a) {
    this.extraStreamInfo[h] = a;
    this.mergeStreamInfo();
    return this;
  },
  mergeStreamInfo: function () {
    for (var h in this.extraStreamInfo) {
      if (Object.prototype.hasOwnProperty.call(this.extraStreamInfo, h)) {
        this.streamInfo[h] = this.extraStreamInfo[h];
      }
    }
  },
  lock: function () {
    if (this.isLocked) {
      throw new Error("The stream '" + this + "' has already been used.");
    }
    this.isLocked = true;
    if (this.previous) {
      this.previous.lock();
    }
  },
  toString: function () {
    var h = "Worker " + this.name;
    if (this.previous) {
      return this.previous + " -> " + h;
    } else {
      return h;
    }
  }
};
module.exports = u;
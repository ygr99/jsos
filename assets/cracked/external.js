var u = null;
u = typeof Promise !== "undefined" ? Promise : require("lie");
module.exports = {
  Promise: u
};
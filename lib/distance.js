var cd = require('color-difference');
var rgbHex = require('rgb-hex');

module.exports = function(a, b) {
  var ahex = rgbHex(a.red, a.green, a.blue);
  var bhex = rgbHex(b.red, b.green, b.blue);

  return cd.compare('#'+ahex, '#'+bhex, 'EuclideanDistance');
}

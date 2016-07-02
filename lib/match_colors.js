var rgbToInt = require('rgb-to-int');
var merge = require('./merge');

module.exports = function(colors) {
  var colorsByInt = {};
  colors.forEach((color, idx) => {
    var int = ''+rgbToInt(color);

    if (colorsByInt[int]) {
      colorsByInt[int] = merge(colorsByInt[int], color);
    }
    else {
      colorsByInt[int] = color;
    }
  });

  var outColors = Object.keys(colorsByInt).map(int => colorsByInt[int]);
  colorsByInt = null;
  return outColors;
}

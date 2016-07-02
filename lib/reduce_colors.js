var merge = require('./merge');
var dist = require('./distance');

module.exports = function(colors, numChannels) {
  colors.sort((a, b) => {
    var rd = a.red - b.red;
    var gd = a.green - b.green;
    var bd = a.blue - b.blue;
    return (rd + gd + bd) / 3;
  });

  var numPixels = colors.reduce((memo, color) => memo += color.ds.length, 0);

  var totalColors = colors.length;
  var lastTime = totalColors * 2;
  while(colors.length > numChannels) {
    lastTime = colors.length;
    var mergesLeft = colors.length - numChannels;
    colors = colors.reduce((memo, color, idx, src) => {
      if (mergesLeft === 0) {
        memo.push(color);
        return;
      }
      var back = memo[memo.length-1];
      var next = src[idx+1];
      if (back === undefined || back.ds.length > totalColors / numChannels) {
        memo.push(color);
      }
      else if (next === undefined || dist(back, color) < dist(next, color) && back.ds.length < totalColors / numChannels) {
        memo[memo.length-1] = merge(back, color);
        mergesLeft--;
      }
      else {
        memo.push(color);
      }
      return memo;
    }, []);

    if (lastTime === colors.length) {
      var min = colors.reduce((memo, color) => memo < color.ds.length ? memo : color.ds.length, numPixels);
      colors = colors.reduce((memo, color) => {
        var back = memo[memo.length-1];
        if (back && back.ds.length === min || back && color.ds.length === min) {
          memo[memo.length-1] = merge(back, color);
        }
        else {
          memo.push(color);
        }
        return memo;
      }, []);
    }
  }
  return colors;
}

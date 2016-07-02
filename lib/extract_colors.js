module.exports = function(pixels) {
  var colors = [];
  for (var d = 0; d<pixels.data.length; d+=pixels.shape[2]) {
    colors.push({
      ds: [d],
      red: pixels.data[d],
      green: pixels.data[d+1],
      blue: pixels.data[d+2]
    });
  }
  return colors;
}

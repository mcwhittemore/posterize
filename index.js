var ndarray = require('ndarray');

var extractColors = require('./lib/extract_colors');
var matchColors = require('./lib/match_colors');
var reduceColors = require('./lib/reduce_colors');
var dist = require('./lib/distance');

module.exports = function(pixels, numChannels, sort) {
  var customColors = null;
  if (typeof numChannels !== 'number') {
    customColors = numChannels;
    numChannels = customColors.length;
  }

  var colors = extractColors(pixels);
  colors = matchColors(colors); //collect all pixels of the same color
  colors = reduceColors(colors, numChannels);

  if (customColors === null) {
    customColors = colors;
  }
  else if (sort !== false) {
    customColors.sort((a, b) => {
      return dist(a, b);
    });
  }

  var outdata = [];
  for (var i=0; i<pixels.data.length; i++) {
    outdata[i] = pixels.data[i];
  }
  var out = ndarray(outdata, pixels.shape, pixels.stride, pixels.offset);

  colors.forEach((color, idx) => {
    color.ds.forEach(ds => {
      out.data[ds] = customColors[idx].red;
      out.data[ds+1] = customColors[idx].green;
      out.data[ds+2] = customColors[idx].blue;
    });
  });
  return out;
}


// Lifted from 'color-difference'
// https://github.com/garex/nodejs-color-difference/blob/debdca61d5616bdab6631e1aa28453fac3efef64/lib/method/euclidean-distance.js

function squaredDelta(v1, v2) {
  return Math.pow(v1 - v2, 2);
}

module.exports = function(color1, color2) {
  var sum = 0;
  sum += squaredDelta(color1.red,   color2.red);
  sum += squaredDelta(color1.green, color2.green);
  sum += squaredDelta(color1.blue,  color2.blue);

  var conversionIndex = 19.5075;

  return Math.sqrt(sum / conversionIndex);

}

module.exports = function(a, b) {
  var ads = a.ds.length;
  var bds = b.ds.length;

  a.red = ((a.red * ads) + (b.red * bds)) / (ads + bds);
  a.green = ((a.green * ads) + (b.green * bds)) / (ads + bds);
  a.blue = ((a.blue * ads) + (b.blue * bds)) / (ads + bds);

  for(var i=0; i<b.ds.length; i++) {
    a.ds.push(b.ds[i]);
  }

  return a;
}

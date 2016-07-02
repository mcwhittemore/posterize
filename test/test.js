var fs = require('fs');
var path = require('path');

var posterize = require('../');
var getPixels = require('get-pixels');
var savePixels = require('save-pixels');


var img = null;

describe('test differe posterize inputs on a photo of obama', function() {
  before(function(done) {
    getPixels(path.join(__dirname, 'fixtures', 'obama.png'), function(err, pixels) {
      if (err) return done(err);
      img = pixels;
      done();
    });
  });

  it('converts an image into a poster', function() {
    this.timeout(4500);
    var out = posterize(img, 3);
    savePixels(out, 'jpg').pipe(fs.createWriteStream(path.join(__dirname, 'output', Date.now()+'.jpg')));
  });

  it('converts an image into a poster with your colors', function() {
    this.timeout(4500);
    var out = posterize(img, [
      {red: 252, green: 228, blue: 168},
      {red: 215, green: 26, blue: 33},
      {red: 113, green: 150, blue: 159},
      {red: 0, green: 50, blue: 75}
    ], true);
    savePixels(out, 'jpg').pipe(fs.createWriteStream(path.join(__dirname, 'output', Date.now()+'.jpg')));
  });
});


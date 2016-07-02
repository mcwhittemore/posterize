# Posterize

![](./test/fixtures/obama.png)
![](./test/fixtures/number.png)
![](./test/fixtures/sorted_array.png)

## Install

`npm install posterize`

## Usage

```js
var getPixels = require('get-pixels');
var savePixels = require('save-pixels');
var fs = require('fs');

var posterize = require('posterize');

getPixels('./path-to-image.jpg', function(err, pixels) {
  var poster = posterize(pixels);
  savePixels(poster, 'jpg').pipe(fs.createWriteStream('./poster.jpg');
});
```

## Arguments

`posterize(pixels, colors, ?sort)`

### pixels

This is an [ndarray](https://github.com/scijs/ndarray) with a shape of `[x, y, 3]` or `[x, y, 4]`. Posterize only works on the rgb channels and clones the alpha channel if present.

### colors

This is either a `number` greater than zero or an array of rgb objects. If it is a number `posterize` will create colors based on its color reducing process. If its an array, the length of the array will determine the number of colors and the values will be used when setting the new images pixels.

an rgb object looks like:

```json
{
  "red": 255,
  "green": 255,
  "blue": 255
}
```

### sort (not required)

This is a non required boolean the defaults to true.

When `colors` is an array, `sort` can be passed to force `posterize` to resort the passed color array or not. If `sort` is true `posterize` will resort the provided colors to match color order of the poserized image.

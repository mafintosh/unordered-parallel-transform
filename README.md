# unordered-parallel-transform

Unordered version of [parallel-transform](https://github.com/mafintosh/parallel-transform)

```
npm install unordered-parallel-transform
```

## Usage

``` js
var parallel = require('unordered-parallel-transform')

var stream = parallel(10, function (data, cb) {
  setTimeout(done, Math.floor(Math.random() * 1000))

  function done () {
    cb(null, data)
  }
})

stream.on('data', console.log)

for (var i = 0; i < 100; i++) stream.write('hello #' + i)
```

## License

MIT

var parallel = require('./')

var stream = parallel(10, function (data, cb) {
  setTimeout(cb.bind(this, null, data), Math.floor(Math.random() * 1000))
})

stream.on('data', console.log)

for (var i = 0; i < 100; i++) stream.write('hello #' + i)

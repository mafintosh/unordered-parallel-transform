var through = require('through2')

module.exports = parallel

function parallel (max, fn) {
  var free = max
  var nextData = null
  var nextCallback = null
  var flushCallback = null

  var stream = through.obj(write, flush)
  return stream

  function flush (cb) {
    if (free === max) cb()
    else flushCallback = cb
  }

  function write (data, enc, cb) {
    if (!free) {
      nextData = data
      nextCallback = cb
      return
    }

    free--
    cb()

    fn(data, function (err, res) {
      if (err) return cb(err)

      free++
      if (res) stream.push(res)
      if (flushCallback && free === max) return flushCallback()
      if (!nextData) return

      var d = nextData
      var cb = nextCallback
      nextData = null
      nextCallback = null
      write(d, null, cb)
    })
  }
}

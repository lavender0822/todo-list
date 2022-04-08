const moment = require('moment')

const timeShow = (time) => {
  if(time) {
    time = time.toString().slice(0,5)
    return time
  } else {
    return null
  }
}

const ifCond = (a, b, options) => {
  return a === b ? options.fn(this) : options.inverse(this)
}
module.exports = {
  timeShow,
  ifCond
}

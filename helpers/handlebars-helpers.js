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

const eq = (a, b) => {
  if (a === b)
    return 'selected'
}

module.exports = {
  timeShow,
  ifCond,
  eq
}

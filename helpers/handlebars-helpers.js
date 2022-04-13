const timeShow = (time) => {
  if(time) {
    time = time.toString().slice(0,5)
    return time
  } else {
    return null
  }
}

const getYear = (date) => {
    date = date.toString().slice(0,4)
    return date
}

const getMonth = (date) => {
    date = date.toString().slice(5,7)
    return date
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
  getYear,
  getMonth,
  eq
}

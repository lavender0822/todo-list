const moment = require('moment')

const timeShow = (time) => {
  if(time) {
    time = time.toString().slice(0,5)
    return time
  } else {
    return null
  }

}
module.exports = {
  timeShow
}

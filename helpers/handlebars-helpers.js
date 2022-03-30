const dayjs = require('dayjs')

const tpTime = (time) => {
  return dayjs(time).format('YYYY/MM/DD, hh:mm')
}

module.exports = {
  tpTime
}

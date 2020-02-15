const getDateString = (date) => {
  let month = date.getUTCMonth() + 1
  month = month > 9 ? month : `0${month}`

  let day = date.getUTCDate()
  day = day > 9 ? day : `0${day}`

  return `${date.getUTCFullYear()}-${month}-${day}`
}

const getYesterdayDateString = (date) => {
  const yesterday = new Date().setDate(date.getUTCDate() - 1)

  return getDateString(new Date(yesterday))
}

module.exports = {
  getDateString,
  getYesterdayDateString
}

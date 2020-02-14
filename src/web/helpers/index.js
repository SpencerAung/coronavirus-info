export function getFormattedDate (today = new Date()) {
  let date = today.getDate()
  date = date > 9 ? date : `0${date}`

  let month = today.getMonth() + 1
  month = month > 9 ? month : `0${month}`

  return [today.getFullYear(), month, date].join('-')
}

export const toLocaleString = (number = 0) => number.toLocaleString('en-US') || '0'

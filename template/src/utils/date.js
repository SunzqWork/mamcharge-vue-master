function getTime(dateStr) {
  // 兼容mac
  const date = new Date(dateStr.replace(/-/g, '/'))
  return {
    getFullYear: date.getFullYear(),
    getMonth: (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
    getDate: date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
    getHours: date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
    getMinutes: date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
    getSeconds: date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  }
}

// 获取到分钟 2018-11-11 12:12
export function getTimeM(dateStr) {
  const date = getTime(dateStr)
  return `${date.getFullYear}-${date.getMonth}-${date.getDate} ${date.getHours}:${date.getMinutes}`
}
// 获取到S的时间  2018-09-10 23::59:59
export function getTimeS(dateStr) {
  const date = getTime(dateStr)
  return `${date.getFullYear}-${date.getMonth}-${date.getDate} ${date.getHours}:${date.getMinutes}:${date.getSeconds}`
}
// 获取到日 2018-12-12
export function getTimeD(dateStr) {
  const date = getTime(dateStr)
  return `${date.getFullYear}-${date.getMonth}-${date.getDate}`
}
// 计算两个时间相差几个月份
export function getMonths(startdata, enddata) {
  // 拆分年月日
  startdata = startdata.split('-')
  // 得到月数
  startdata = parseInt(startdata[0]) * 12 + parseInt(startdata[1])
  // 拆分年月日
  enddata = enddata.split('-')
  // 得到月数
  enddata = parseInt(enddata[0]) * 12 + parseInt(enddata[1])
  var m = Math.abs(startdata - enddata)
  return m
}
// 获取一组数据中的最大时间
export function getMaxdate(dataArr) {
  var newArray = Array.from(new Set(dataArr))
  var maxNum = Math.max(...newArray)
  return maxNum
}
// 获取下个月的今天
export function getNextMonth(date) {
  const arr = date.split('-')
  const year = arr[0] // 获取当前日期的年份
  const month = arr[1] // 获取当前日期的月份
  const day = arr[2] // 获取当前日期的日
  // let days = new Date(year, month, 0)
  // days = days.getDate() // 获取当前日期中的月的天数
  let year2 = year
  let month2 = parseInt(month) + 1
  if (month2 === 13) {
    year2 = parseInt(year2) + 1
    month2 = 1
  }
  let day2 = day
  let days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  const t2 = year2 + '-' + month2 + '-' + day2
  return t2
}

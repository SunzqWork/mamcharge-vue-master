export default function getMysqoDate(time) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = ((date.getMonth()).toString().length == 1 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) // 月份是从0开始的
  const day = ((date.getDate()).toString().length == 1 ? ('0' + date.getDate()) : date.getDate())
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  const newTime = year + '-' + month + '-' + day
  return newTime
}

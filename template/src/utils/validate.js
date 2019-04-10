// 正整数验证
export function interValidate(str) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  return reg.test(str)
}

// 手机号验证
export function phoneValidate(phone) {
  const reg = /^[1][3,4,5,7,8,2,6,9,1,0][0-9]{9}$/
  return reg.test(phone)
}

// 验证金额，可保留两位小数点
export function floatValidate(str) {
  const reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
  return reg.test(str)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function emailValidate(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

// 0以及正整数
export function validateInterAndZero(num) {
  const reg = /^([1-9]\d*|[0]{1,1})$/
  return reg.test(num)
}

// 身份证校验
export function isCardNo(value) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(value)
}

// 密码验证 字母，数字
export function passwordValidate(str) {
  const reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
  return reg.test(str)
}

// 验证是否有特殊字符
export function specialStrValidate(str) {
  const reg = /[`~!@#$%^&*_+<>{}\/'[\]]/im
  return reg.test(str)
}
export function weakPassword(value) {
  let reg = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$/g
  return reg.test(value)
}

export function inPassword(value) {
  let reg = /^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9])))/g
  return reg.test(value)
}

export function strongPassword(value) {
  let reg = /(?=.{6,}).*/g
  return reg.test(value)
}
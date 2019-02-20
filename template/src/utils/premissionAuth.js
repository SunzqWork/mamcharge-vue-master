import Cookies from 'js-cookie'

let TokenKey = ''
if (process.env.NODE_ENV === 'test') {
  TokenKey = 'test-token'
} else if (process.env.NODE_ENV === 'development') {
  TokenKey = 'test-token'
} else if (process.env.NODE_ENV === 'pre') {
  TokenKey = 'pre-token'
} else if (process.env.NODE_ENV === 'production') {
  TokenKey = 'premission-token'
} else {
  TokenKey = ''
}
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

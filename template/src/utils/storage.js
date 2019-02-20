// 存储数据
export function setStorage(name, data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  sessionStorage.setItem(name, data)
}

// 获取缓存数据
export function getStorage(name) {
  return sessionStorage.getItem(name)
}

// 清楚全部缓存
export function clearStorage() {
  sessionStorage.clear()
}

// 清楚特定的缓存数据
export function removeStorage(name) {
  sessionStorage.removeItem(name)
}
